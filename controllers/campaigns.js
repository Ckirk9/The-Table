// Require Statements
const express = require('express')
const router = express.Router()
const Campaign = require('../models/campaign')
const Session = require('../models/session') 
const mongoose = require('mongoose')


// ROUTES

// INDEX
router.get('/', (req, res) => {
    Campaign.find({}, (err,foundCampaigns) => (
        res.render('campaigns/index', {
            campaigns: foundCampaigns
        })
    ))
})

// FILTER (post)
router.post('/filter', (req,res) => {
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
        res.redirect('/campaigns/filter/' + filterString) 
    } else {
        res.redirect('/campaigns/index')
    }
})

// FILTER (get)
router.get('/filter/:id', async (req, res) => {
    const filterString = req.params.id 
    let filterObject = {}
    let filterArray = filterString.split('&')
    filterArray.forEach(filterProperty => {
        filterProperty = filterProperty.split('=')
        filterObject[filterProperty[0]] = filterProperty[1]
    })
    console.log(filterObject)
    if (filterObject.openSlots === "on") {
        filterObject.openSlots = { $gte: 1 }
    } else {
        filterObject.openSlots = { $gte: 0 }
    }
    console.log(filterObject)
    const foundCampaigns = await Campaign.find(filterObject)
    res.render('campaigns/filter.ejs', {
        campaigns: foundCampaigns,
    })
})

// NEW
router.get('/new', (req, res) => {
    res.render('campaigns/new')
})
// CREATE
router.post('/', (req,res) => {
    Campaign.create(req.body,(err, createdCampaign) => {
        console.log(createdCampaign)
        console.log(err)
        res.redirect('/campaigns')
    })
})

// EDIT 
router.get('/:id/edit', async (req, res) => {
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
        console.log("In Deleter")
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
    .populate({path: 'sessions'}) 
    .exec((err, foundCampaign) => {
        if (err) {console.log(err)}
        console.log(foundCampaign)
        res.render('campaigns/show.ejs', {
            campaign: foundCampaign,
        })
    })
})

// Exports
module.exports = router