// Require Statements
const express = require('express')
const router = express.Router()
const Campaign = require('../models/campaign')
//const methodOverride = require('method-override')


// Routes

// INDEX
router.get('/', (req, res) => {
    Campaign.find({}, (err,foundCampaigns) => (
        //console.log(foundCampaigns)
        res.render('campaigns/index.ejs', {
            campaigns: foundCampaigns
        })
    ))
})




module.exports = router