const express = require('express')
const routes = require('./routes/index.js')

const app = express()
const port = process.env.PORT || 3000

routes(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app