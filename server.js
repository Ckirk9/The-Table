// require statements
const express = require('express')
const app = express()
const campaignsController = require('./controllers/campaigns.js')

// I need these but don't know how to import them correctly???
// import * as mdb from 'mdb-ui-kit'; 
// @import '~mdb-ui-kit/css/mdb.min.css'; 

// middleware


// routes

// route for campaign
app.use('/campaigns', campaignsController)

// root route to homepage
app.get('/', (req, res) => {
    res.render('home.ejs')
})




//listen
const PORT = 3000
app.listen(PORT, () => {
    console.log('listening')
})