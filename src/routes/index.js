const { Router } = require('express')
const router = Router()
const { generatePDF } = require('../pdf/index')

router.get('/', async(req, res) => {
  res.send('Hello Bitch!')
})

router.get('/export', async(req, res) => {
  try{
    const filename = 'finanzas'
    // TODO: agregar los valores
    const buffer = await generatePDF()
    res.set('Content-Type', 'application/pdf')
    res.set('Content-Length', buffer.length);
    res.set('Content-Disposition', `attachment; filename="${filename}.pdf"`)
    res.set("access-control-expose-headers", ",Authorization,Content-Length");
    res.send(buffer);
  }catch(e){
    console.log(e)
  }
})

module.exports = router
