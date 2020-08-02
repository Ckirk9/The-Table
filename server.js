// require statements
const express = require('express')
const app = express()
const sessionsController = require('./controllers/sessions.js')
const campaignsController = require('./controllers/campaigns.js')

//middleware
app.use('/sessions', sessionsController)



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