const fs = require('fs');
const path = require('path')
const pdfKit = require('pdfkit');

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

      doc.text('Platos vendidos la primera semana', 23, 138,9,9, {align: 'right'})
      doc.text('Platos vendidos la segunda semana', 23, 168,9,9, {align: 'right'})
      doc.text('Platos vendidos la tercera semana', 23, 198,9,9, {align: 'right'})
      doc.text('Platos vendidos la cuarta semana', 23, 228,9,9, {align: 'right'})
      //doc.text('Saldo inicial', 23, 258,9,9, {align: 'right'})
      //doc.text('Saldo inicial', 23, 288,9,9, {align: 'right'})

      doc.text('Insumos', 23, 363,9,9, {align: 'right'})
      doc.text('Sueldo personal', 23, 393,9,9, {align: 'right'})
      doc.text('Arriendo local', 23, 423,9,9, {align: 'right'})
      doc.text('Publicidad', 23, 453,9,9, {align: 'right'})
      //doc.text('Saldo inicial', 23, 483,9,9, {align: 'right'})


      //doc.text(fakevalue, 403, 108, 350, 30, {align: 'left'})
      doc.text(fakevalue, 403, 138, 350, 30, {align: 'left'})
      doc.text(fakevalue, 403, 168, 350, 30, {align: 'left'})
      doc.text(fakevalue, 403, 198, 350, 30, {align: 'left'})
      doc.text(fakevalue, 403, 228, 350, 30, {align: 'left'})
      //doc.text(fakevalue, 403, 258, 350, 30, {align: 'left'})
      //doc.text(fakevalue, 403, 288, 350, 30, {align: 'left'})

      doc.text(fakevalue, 403, 363, 350, 30, {align: 'left'})
      doc.text(fakevalue, 403, 393, 350, 30, {align: 'left'})
      doc.text(fakevalue, 403, 423, 350, 30, {align: 'left'})
      doc.text(fakevalue, 403, 453, 350, 30, {align: 'left'})
      //doc.text(fakevalue, 403, 475, 350, 30, {align: 'left'})

      doc.text(fakevalue, 403, 550, 350, 30, {align: 'left'})

      doc.rect(20, 100, 350, 30).fillAndStroke('#e5e5e5')
      doc.fillAndStroke('black')
      doc.rect(20, 100, 350, 30).stroke()
      doc.font('Times-Bold')
      doc.text('Ingresos', 23, 108,9,9, {align: 'right'})
      doc.font('Times-Roman')

      doc.rect(20, 130, 350, 30).stroke()
      doc.rect(20, 160, 350, 30).stroke()
      doc.rect(20, 190, 350, 30).stroke()
      doc.rect(20, 220, 350, 30).stroke()
      //doc.rect(20, 250, 350, 30).stroke()
      //doc.rect(20, 280, 350, 30).stroke()

      doc.rect(390, 100, 350, 30).fillAndStroke('#e5e5e5')
      doc.fillAndStroke('black')
      doc.rect(390, 100, 350, 30).stroke()
      doc.font('Times-Bold')
      doc.text('Monto', 405, 108, 350,9, {align: 'right'})
      doc.font('Times-Roman')

      doc.rect(390, 130, 350, 30).stroke()
      doc.rect(390, 160, 350, 30).stroke()
      doc.rect(390, 190, 350, 30).stroke()
      doc.rect(390, 220, 350, 30).stroke()

      doc.rect(20, 325, 350, 30).fillAndStroke('#e5e5e5')
      doc.fillAndStroke('black')
      doc.rect(20, 325, 350, 30).stroke()
      doc.font('Times-Bold')
      doc.text('Egresos', 23, 333,9,9, {align: 'right'})
      doc.font('Times-Roman')

      doc.rect(20, 355, 350, 30).stroke()
      doc.rect(20, 385, 350, 30).stroke()
      doc.rect(20, 415, 350, 30).stroke()
      doc.rect(20, 445, 350, 30).stroke()
      //doc.rect(20, 475, 350, 30).stroke()

      doc.rect(390, 325, 350, 30).fillAndStroke('#e5e5e5')
      doc.fillAndStroke('black')
      doc.rect(390, 325, 350, 30).stroke()
      doc.font('Times-Bold')
      doc.text('Monto', 405, 333, 350,9, {align: 'right'})
      doc.font('Times-Roman')

      doc.rect(390, 355, 350, 30).stroke()
      doc.rect(390, 385, 350, 30).stroke()
      doc.rect(390, 415, 350, 30).stroke()
      doc.rect(390, 445, 350, 30).stroke()

      doc.rect(20, 543, 350, 30).fillAndStroke('#e5e5e5')
      doc.fillAndStroke('black')
      doc.rect(20, 543, 350, 30).stroke()
      doc.font('Times-Bold')
      doc.text('Total', 23, 550,9,9, {align: 'right'})
      doc.font('Times-Roman')

      doc.rect(390, 543, 350, 30).stroke()

      doc.end();
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
      const filePath = path.join(__dirname, 'finanzas.pdf')
      fs.writeFileSync(filePath, buffer)
      console.log(`File created ${filePath}`)
    })
    .catch(e => {
      console.log(e);
    })
}

module.exports.generatePDF = generatePDF;
