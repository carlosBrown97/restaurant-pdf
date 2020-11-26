const mysql = require('mysql')
const config = require('../config.json')

var connection = mysql.createConnection({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_DATABASE
})

connection.connect()

const data = connection.query('SELECT * FROM orders_completed', function(err, rows) {
  if (err) {
    console.log('ERROR', err.stack)
  }
  console.log('DATA', rows)
  return rows
})

connection.end()
