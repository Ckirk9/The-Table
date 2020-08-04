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

// FILTER (post)
router.post('/filter', (req,res) => {
    console.log(req.body)
    const filterObject = req.body 
    let filterString = ''
    for (const property in filterObject) {
        if (filterObject[property]) {
            console.log(`${property}: ${filterObject[property]}`)
            filterString = filterString + property + '=' + filterObject[property] + '&'
        }
    }
    if (filterString) {
        filterString = filterString.substring(0, filterString.length - 1)
        res.redirect('/campaigns/filter/' + filterString) //placeholder redirect
    } else {
        res.redirect('/campaigns/index')
    }
})

// FILTER (get)
router.get('/filter/:id', (req, res) => {
    const filterString = req.params.id
    Campaign.find({}, (err,foundCampaigns) => (
        res.render('campaigns/filter.ejs', {
            campaigns: foundCampaigns,
            filterString: filterString
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

    Campaign.findByIdAndDelete(req.params.id, (err, deletedCampaign) => {
        //console.log("In Deleter")
        Session.deleteMany({
            _id: {
                $in: deletedCampaign.sessions
            }
        }, (err, data) => {
            console.log(err)
            res.redirect('/campaigns')
        })

  
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