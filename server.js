const express = require('express')
const app = express()
const sessionsController = require('./controllers/sessions.js')


//middleware
app.use('/sessions', sessionsController)



// root route to homepage
app.get('/', (req, res) => {
    res.render('home.ejs')
})




//listen
const PORT = 3000
app.listen(PORT, () => {
    console.log('listening')
})