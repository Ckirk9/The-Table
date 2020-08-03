// require statements
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const sessionsController = require('./controllers/sessions.js')
const campaignsController = require('./controllers/campaigns.js')

//DB connection
const connectionString = 'mongodb://localhost/the-table'
const db = mongoose.connection

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})

db.on('connected', () => console.log(`Mongoose connected to ${connectionString}`))
db.on('disconnected', () => console.log('Mongoose disconnected'))
db.on('error', (err) => console.log('Mongoose error', err))

//middleware
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))


// route for sessions
app.use('/sessions', sessionsController)


// routes

// route for campaign
app.use('/campaigns', campaignsController)

// root route to homepage
app.get('/', (req, res) => {
    res.render('home.ejs')
})




//listen
const PORT = 4000
app.listen(PORT, () => {
    console.log('listening on port: ' + PORT)
})