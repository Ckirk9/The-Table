// require statements
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const ejsLayouts = require('express-ejs-layouts')

require("dotenv").config()

const sessionsController = require('./controllers/sessions.js')
const campaignsController = require('./controllers/campaigns.js')


//DB connection
const db = mongoose.connection

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})

db.on('connected', () => console.log(`Mongoose connected to ${process.env.MONGODB_URI}`))
db.on('disconnected', () => console.log('Mongoose disconnected'))
db.on('error', (err) => console.log('Mongoose error', err))

//middleware
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
// css / sass
app.use(express.static(__dirname + '/public/'));
// ejs layouts
app.set('view engine', 'ejs');
app.use(ejsLayouts);


// Session Routes 
app.use('/sessions', sessionsController)

// Campaign Routes
app.use('/campaigns', campaignsController)

// root route to homepage
app.get('/', (req, res) => {
    res.render('home')
})




//listen
app.listen(process.env.PORT, () => {
    console.log('listening on port: ' + process.env.PORT)
})