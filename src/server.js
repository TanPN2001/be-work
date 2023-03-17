const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const connectDB = require('./configs/connectDB')
connectDB()

app.get('/hello', function (req, res) {
  res.send('Hello World')
})

const common = require('./controllers/common/Common.Router')
app.use('/', common)

const work = require('./controllers/work/Work.Router')
app.use('/work', work)


const config = require('./configs/config')
app.listen(config.CONFIG.port)