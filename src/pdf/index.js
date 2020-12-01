const fs = require('fs');
const path = require('path')
const pdfKit = require('pdfkit');
const { data } = require('../connection')

const generatePDF = async(options) => {
  console.log('Starting generate pdf...')

  return new Promise(async(resolve, reject) => {
    const doc = new pdfKit({
      size: 'LETTER',
      layout: 'landscape',
      autoFirstPage: false,
      margins: { left: 30, right: 30, top: 30, bottom: 30 },
    })

    let buffers = []
    doc.on('data', buffers.push.bind(buffers))
    doc.on('end', () => {
      return resolve(Buffer.concat(buffers))
    })

    try {
      doc.addPage();
      const date = new Date()
      const datesplit = date.toString().split(' ')
      //console.log(datesplit[1])
      const title = 'Reporte financiero mes: ' + datesplit[1]
      const fakevalue = '$999.999'

      doc.font('Times-Bold')
      doc.text('Restaurante')
      doc.font('Times-Roman')
      doc.text('Siglo XXI')
      doc.font('Times-Bold')
      doc
        .save()
        .fontSize(28)
        .text(`${title}`, { align: 'center' });

      doc.font('Times-Roman')
      doc.fontSize(18)

      //let w = 295
      let x = 108
      //let y = 276
      let z = 100

      let orders_completed = options.filter(x => x.status === 'Finalizado')
      //console.log('DATA', orders_completed)
      // first section
      doc.rect(20, 100, 350, 30).fillAndStroke('#e5e5e5')
      doc.fillAndStroke('black')
      doc.rect(20, 100, 350, 30).stroke()
      doc.font('Times-Bold')
      doc.text('Ingresos', 23, 108,9,9, {align: 'right'})
      doc.font('Times-Roman')

      doc.rect(390, 100, 350, 30).fillAndStroke('#e5e5e5')
      doc.fillAndStroke('black')
      doc.rect(390, 100, 350, 30).stroke()
      doc.font('Times-Bold')
      doc.text('Monto', 405, 108, 350,9, {align: 'right'})
      doc.font('Times-Roman')

      let totalFirstSection = 0
      const aaa = orders_completed.reduce((acc, item) => {
        if (!acc[item.name]) {
          acc[item.name] = parseInt(item.quantity)
          totalFirstSection += item.price * item.quantity
        }else{
          acc[item.name] += parseInt(item.quantity)
          totalFirstSection += item.price * item.quantity
        }
        return acc
      }, [])

      const bbb = orders_completed.reduce((acc, item) => {
        if (!acc[item.name]) {
          acc[item.name] = item.price
        }
        return acc
      }, [])

      const ccc = Object.keys(aaa)
      //console.log('ACC', totalFirstSection)
      for await(let order of ccc) {
        // fist section
        let newtotalfirstsection = new Intl.NumberFormat('es-ES').format(bbb[order] * aaa[order])
        //console.log('Order', order)
        doc.text(`${order} x ${aaa[order]}`, 23, x += 30,9,9, {align: 'right'})
        doc.rect(20, z += 30, 350, 30).stroke()
        doc.text(`$${newtotalfirstsection}`, 403, x, 350, 30, {align: 'left'})
        doc.rect(390, z, 350, 30).stroke()
      }

      // second section
      doc.rect(20, z += 60, 350, 30).fillAndStroke('#e5e5e5')
      doc.fillAndStroke('black')
      doc.rect(20, z, 350, 30).stroke()
      doc.font('Times-Bold')
      doc.text('Egresos', 23, x += 60,9,9, {align: 'right'})
      doc.font('Times-Roman')

      doc.rect(390, z , 350, 30).fillAndStroke('#e5e5e5')
      doc.fillAndStroke('black')
      doc.rect(390, z, 350, 30).stroke()
      doc.font('Times-Bold')
      doc.text('Monto', 405, x, 350,9, {align: 'right'})
      doc.font('Times-Roman')

      const secondpart = [
        {
          name: 'Insumos',
          price: 100000
        },
        {
          name: 'Sueldos del personal',
          price: 1000000
        },
        {
          name: 'Gastos extra',
          price: 30000
        }
      ]

      let totalSecondSection = 0
      for await(let second of secondpart) {
        let newtotalsecondsection =  new Intl.NumberFormat('es-ES').format(second.price)
        // second section
        doc.text(second.name, 23, x += 30,9,9, {align: 'right'})
        doc.rect(20, z += 30, 350, 30).stroke()
        doc.text(`$${newtotalsecondsection}`, 403, x, 350, 30, {align: 'left'})
        totalSecondSection += second.price
        doc.rect(390, z, 350, 30).stroke()
      }

      let total = 0
      //console.log('FIRST', totalFirstSection)
      //console.log('SECOND', totalSecondSection)
      total = totalFirstSection - totalSecondSection
      let newtotal = new Intl.NumberFormat('es-ES').format(total)
      //console.log('newtotal', newtotal)
      // third section
      doc.rect(20, z += 60, 350, 30).fillAndStroke('#e5e5e5')
      doc.fillAndStroke('black')
      doc.rect(20, z, 350, 30).stroke()
      doc.font('Times-Bold')
      doc.text('Total ganancias', 23, x += 60,9,9, {align: 'right'})
      doc.font('Times-Roman')

      doc.text(`$${newtotal}`, 403, x, 350, 30, {align: 'left'})
      doc.rect(390, z, 350, 30).stroke()

      doc.end();
      console.log('Pdf generate successfully!')
    } catch (e) {
      console.log(e);
      return reject(e);
    }
  })
}

if( require.main == module ){
  const args = process.argv;

  generatePDF()
    .then(buffer => {
      const filePath = path.join(__dirname, 'sample.pdf')
      fs.writeFileSync(filePath, buffer)
      console.log(`File created ${filePath}`)
    })
    .catch(e => {
      console.log(e);
    })
}

module.exports.generatePDF = generatePDF;
