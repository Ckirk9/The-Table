const express = require('express')
const router = express.Router()
const Session = require('../models/session')
const Campaign = require('../models/campaign')

// path to sessions index
router.get('/', (req, res) => {
    Session.find({}, (err, foundSessions) => {
        res.render('sessions/index.ejs', {
            sessions: foundSessions
        })
    })
}) 

// path to edit
router.get('/:id/edit', (req, res) => {
    Session.findById(req.params.id, (err, foundSession)=>{
        res.render('sessions/edit.ejs', {
            session : foundSession
        })
    })
})

// path to veiw edited session 
router.put('/:id', (req, res) => {
    Session.findByIdAndUpdate(req.params.id, req.body, () => {
        res.redirect('/sessions')
    })
})

// path to delete
router.delete('/:id', (req, res) =>{
    Session.findByIdAndDelete(req.params.id, () => {
        res.redirect('/sessions')
    })
})

// path to sessions new
router.get('/new/:id', (req, res) => {
    Campaign.findById(req.params.id, req.body, (err, foundCampaign) => {
        if (err) {console.log(err)}
        res.render('sessions/new.ejs', {
            campaign: foundCampaign
        })
    })
})

router.get('/:id', (req, res) => {
    Session.findById(req.params.id, req.body, (err, foundSession) => {
        Campaign.findById(foundSession.campaign, (err, foundCampaign) => {
            res.render('sessions/show.ejs', {
                session: foundSession,
                campaign: foundCampaign
            })
        })
    })
})

// create route

router.post('/:id', async (req, res) => {
    try {
        req.body.campaign = req.params.id
        const createdSession = await Session.create(req.body)
        const foundCampaign = await Campaign.findById(req.params.id)
        await foundCampaign.sessions.push(createdSession._id)
        foundCampaign.save((err, savedCampaign) => {
            res.redirect('/campaigns/' + req.params.id)
        })
    } catch (err) {
        console.log(err)
    }
})



module.exports = router