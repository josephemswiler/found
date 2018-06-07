const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const expressHandlebars = require("express-handlebars")
const path = require('path')
let db = require('./models')
let PORT = process.env.PORT || 3000
let app = express()

const hbs = expressHandlebars.create({
    defaultLayout: 'main',
    extname: '.hbs',
    partialsDir: 'views/partials'
})

app.engine('.hbs', hbs.engine)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', '.hbs')

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json())

app.use(express.static('public'))

mongoose.Promise = Promise

let MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/founddb'

mongoose.connect(MONGODB_URI)

require('./controllers/found-controller.js')(app)

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))