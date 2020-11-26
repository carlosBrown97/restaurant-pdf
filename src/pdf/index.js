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
      margins: { left: 30, right: 50, top: 30, bottom: 30 },
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

      console.log('DATA', data)
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

      for (let i = 0; i < 4; i++) {
        // fist section
        doc.text('Platos vendidos la primera semana', 23, x += 30,9,9, {align: 'right'})
        doc.rect(20, z += 30, 350, 30).stroke()
        doc.text(fakevalue, 403, x, 350, 30, {align: 'left'})
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

      for (let i = 0; i < 4; i++) {
        // second section
        doc.text('Insumos', 23, x += 30,9,9, {align: 'right'})
        doc.rect(20, z += 30, 350, 30).stroke()
        doc.text(fakevalue, 403, x, 350, 30, {align: 'left'})
        doc.rect(390, z, 350, 30).stroke()
      }

      // third section
      doc.rect(20, z += 60, 350, 30).fillAndStroke('#e5e5e5')
      doc.fillAndStroke('black')
      doc.rect(20, z, 350, 30).stroke()
      doc.font('Times-Bold')
      doc.text('Total', 23, x += 60,9,9, {align: 'right'})
      doc.font('Times-Roman')

      doc.text(fakevalue, 403, x, 350, 30, {align: 'left'})
      doc.rect(390, z, 350, 30).stroke()

      doc.end();
    } catch (e) {
      console.log(e);
      return reject(e);
    }
  })
}

//if( require.main == module ){
  //const args = process.argv;

  //generatePDF()
    //.then(buffer => {
      //const filePath = path.join(__dirname, 'sample.pdf')
      //fs.writeFileSync(filePath, buffer)
      //console.log(`File created ${filePath}`)
    //})
    //.catch(e => {
      //console.log(e);
    //})
//}

module.exports.generatePDF = generatePDF;
