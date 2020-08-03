// Require Statements
const express = require('express')
const router = express.Router()
const Campaign = require('../models/campaign')
//const methodOverride = require('method-override')


// ROUTES

// INDEX
router.get('/', (req, res) => {
    Campaign.find({}, (err,foundCampaigns) => (
        //console.log(foundCampaigns)
        res.render('campaigns/index.ejs', {
            campaigns: foundCampaigns
        })
    ))
})

// NEW
router.get('/new', (req, res) => {
    res.render('campaigns/new.ejs')
})

// CREATE
router.post('/', (req,res) => {
    Campaign.create(req.body,(err, createdCampaign) => {
        res.redirect('/campaigns')
    })
})

// SHOW
router.get('/:id', (req,res) => {
    Campaign.findById(req.params.id, (err, foundCampaign) => {
        //will need to find Sessions also
        res.render('campaigns/show.ejs', {
            campaigns: foundCampaign
        })
    })
})

// Exports
module.exports = router