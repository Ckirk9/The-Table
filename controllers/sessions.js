const express = require('express')
const router = express.Router()
const Session = require('../models/session')
const Campaign = require('../models/campaign')

// path to sessions index
router.get('/', (req, res) => {
    Session.find({}, (err, foundSessions) => {
        res.render('sessions/index', {
            sessions: foundSessions
        })
    })
}) 

// path to edit
router.get('/:id/edit', (req, res) => {
    Session.findById(req.params.id, (err, foundSession)=>{
        res.render('sessions/edit', {
            session : foundSession
        })
    })
})

// path to veiw edited session 
router.put('/:id', (req, res) => {
    Session.findByIdAndUpdate(req.params.id, req.body, (err, foundSession) => {
        console.log("in update")
        console.log(foundSession)
        res.redirect('/sessions')
    })
})

// path to delete
router.delete('/:id', async (req, res) => {
    const foundSession = await Session.findById(req.params.id)
    //console.log("found session: " + foundSession)
    const foundCampaign = await Campaign.findById(foundSession.campaign)
    //console.log("found campaign: " + foundCampaign)
    for (let i = 0; i < foundCampaign.sessions.length; i++) {
        if (foundCampaign.sessions[i] === foundSession._id) {
            foundCampaign.sessions.splice(i, 1)
        }
    }
    await foundCampaign.save() 
    //console.log("saved campaign: " + foundCampaign)
    const deletedSession = await Session.findByIdAndDelete(req.params.id)
    res.redirect('/sessions')
})

// path to sessions new
router.get('/new/:id', (req, res) => {
    Campaign.findById(req.params.id, req.body, (err, foundCampaign) => {
        if (err) {console.log(err)}
        res.render('sessions/new', {
            campaign: foundCampaign
        })
    })
})

//SHOW
router.get('/:id', (req, res) => {
    Session.findById(req.params.id, req.body, (err, foundSession) => {
        Campaign.findById(foundSession.campaign, (err, foundCampaign) => {
            console.log(foundSession)
            console.log(foundCampaign)
            res.render('sessions/show', {
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
        //console.log(foundCampaign)
        await foundCampaign.sessions.push(createdSession._id)
        //console.log(foundCampaign)
        await foundCampaign.save() 
        //console.log("saved campaign: " + foundCampaign)
        res.redirect('/campaigns/' + req.params.id)
        await foundCampaign.save() 
        //console.log("saved campaign: " + foundCampaign)
        res.redirect('/campaigns/' + req.params.id)
    } catch (err) {
        console.log(err)
    }
})



module.exports = router