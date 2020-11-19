const express = require('express');
const routes = require('./routes/index')
const app = express();

const PORT = process.env.PORT || 3000

app.use(routes)

app.listen(PORT, () => {
  console.log('Listen on port 3000')
})
