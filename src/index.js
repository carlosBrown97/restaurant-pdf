const express = require('express');
const routes = require('./routes/index')
const app = express();
const cors = require('cors')

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(routes)
app.use(cors())

app.listen(PORT, () => {
  console.log('Listen on port 3000')
})
