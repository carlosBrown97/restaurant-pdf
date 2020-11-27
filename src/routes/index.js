const { Router } = require('express')
const config = require('../../config.json')
const mysql = require('mysql')
const router = Router()
const { generatePDF } = require('../pdf/index')
//const { data } = require('../connection')

router.get('/', async(req, res) => {
  res.send('Hello Bitch!')
})

router.get('/export', async(req, res) => {
  try{
    const filename = 'finanzas'

    var connection = mysql.createConnection({
      host: config.DB_HOST,
      user: config.DB_USER,
      password: config.DB_PASSWORD,
      database: config.DB_DATABASE
    })

    connection.connect()

    const data = connection.query(`
      SELECT o.food_plate_id, o.status, o.quantity, f.name, f.price
      FROM orders_detail as o, food_plate as f
      WHERE f.id = o.food_plate_id`, async function(err, rows) {
      if (err) {
        console.log('ERROR', err.stack)
      }
      //rows.filter(x => console.log('DATA 2', x.status === 'Finalizado'))

      //console.log('ROWS', rows)
      //return
      const buffer = await generatePDF(rows)
      res.set('Content-Type', 'application/pdf')
      res.set('Content-Length', buffer.length);
      res.set('Content-Disposition', `attachment; filename="${filename}.pdf"`)
      res.set("access-control-expose-headers", ",Authorization,Content-Length");
      res.send(buffer);
      return rows[0]
    })

    //console.log('DDD', data)
    // TODO: agregar los valores
    connection.end()
  }catch(e){
    console.log(e)
  }
})

module.exports = router
