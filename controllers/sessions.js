const express = require('express')
const router = express.Router()
const Session = require('../models/session')

// path to sessions index
router.get('/', (req, res) => {
    Session.find({}, (err, foundSessions) => {
        res.render('sessions/index.ejs', {
            sessions: foundSessions
        })
    })
}) 

// path to sessions new
router.get('/new', (req, res) => {
    res.render('sessions/new.ejs')
})


router.post('/', (req, res) => {
    Session.create(req.body, (err, createdSession) => {
        res.redirect('/sessions')
    })
})

module.exports = router