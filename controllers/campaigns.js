// Require Statements
const express = require('express')
const router = express.Router()
const Campaign = require('../models/campaign')
const Session = require('../models/session') //needed for show page
const mongoose = require('mongoose')


// ROUTES

// INDEX
router.get('/', (req, res) => {
    Campaign.find({}, (err,foundCampaigns) => (
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

// EDIT 
router.get('/:id/edit', (req, res) => {
    Campaign.findById(req.params.id, (err, foundCampaign) => {
        res.render('campaigns/edit.ejs', {
            campaign: foundCampaign
        })
    })
})
// UPDATE
router.post('/:id', (req,res) => {
    Campaign.findByIdAndUpdate(req.params.id, req.body, () => {
        res.redirect('/campaigns')
    })
})

// DELETE
router.delete('/:id', (req,res) => {
    Campaign.findByIdAndDelete(req.params.id, () => {
        res.redirect('/campaigns')
    })
})

// SHOW
router.get('/:id', (req,res) => {
    Campaign.findById(req.params.id) 
    .populate({path: 'sessions'}) //maybe need to add "match"
    .exec((err, foundCampaign) => {
        if (err) {console.log(err)}
        res.render('campaigns/show.ejs', {
            campaign: foundCampaign,
        })
    })
})

// Exports
module.exports = router