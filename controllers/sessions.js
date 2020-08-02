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

// path to delete
router.delete('/:id', (req, res) =>{
    Session.findByIdAndDelete(req.param.id, () => {
        res.redirect('/sessions')
    })
})

// path to sessions new
router.get('/new', (req, res) => {
    res.render('sessions/new.ejs')
})

// path to show page
router.get('/:id', (req, res) => {
    Session.findById(req.params.id, (err, foundSession) => {
        res.render('sessions/show.ejs', {
            session : foundSession
        })
    })
})

router.post('/', (req, res) => {
    Session.create(req.body, (err, createdSession) => {
        res.redirect('/sessions')
    })
})

module.exports = router