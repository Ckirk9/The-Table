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
        res.render('sessions/new', {
            campaign: foundCampaign
        })
    })
})


// // SHOW
// router.get('/:id', (req,res) => {
//     Campaign.findById(req.params.id) 
//     .populate({path: 'sessions'}) //maybe need to add "match"
//     .exec((err, foundCampaign) => {
//         //Session.find({}, (err, foundSessions) => {
//         if (err) {console.log(err)}
//         res.render('campaigns/show.ejs', {
//             campaign: foundCampaign,
//             //sessions: foundSessions
//         })
//     })
// })

// path to show page
// router.get('/:id', (req, res) => {
//     Session.findById(req.params.id)
//     .populate({path: 'campaign'})
//     .exec((err, foundSession) => {
//         if (err) {console.log(err)}
//         res.render('sessions/show.ejs', {
//             session: foundSession
//         })
//     })
// })
router.get('/:id', (req, res) => {
    Session.findById(req.params.id, req.body, (err, foundSession) => {
        Campaign.findById(foundSession.campaign, (err, foundCampaign) => {
            res.render('sessions/show', {
                session: foundSession,
                campaign: foundCampaign
            })
        })
    })
})
// create route
// router.post('/:id', (req, res) => {
//     Session.create(req.body, (err, createdSession) => {
//         Campaign.findById(req.params.id, (err, foundCampaign) => {
//             req.body.body = "pizza"
//             req.body.campaign = req.params.id
//             foundCampaign.sessions.push(createdSession._id)
//             foundCampaign.save((err, savedCampaign) => {
//                 res.redirect('/campaigns/' + req.params.id)
//             })
//         })
//     })
// })
router.post('/:id', async (req, res) => {
    try {
        //req.body.body = "pizza"
        req.body.campaign = req.params.id
        const createdSession = await Session.create(req.body)
        //console.log(createdSession)
        const foundCampaign = await Campaign.findById(req.params.id)
        await foundCampaign.sessions.push(createdSession._id)
        //console.log(foundCampaign)
        foundCampaign.save((err, savedCampaign) => {
            res.redirect('/campaigns/' + req.params.id)
        })
    } catch (err) {
        console.log(err)
    }
})



module.exports = router