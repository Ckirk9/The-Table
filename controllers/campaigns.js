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
        //console.log(foundCampaigns)
        res.render('campaigns/index', {
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
router.get('/filter/:id', async (req, res) => {
    const filterString = req.params.id // MAKE SURE %20 IS CHANGED TO A SPACE
    // const decodedFilterString = decodeURIComponent(filterString)
    // console.log('decoded string')
    // console.log(decodedFilterString)
    // console.log('filter string')
    // console.log(filterString)
    let filterObject = {}
    let filterArray = filterString.split('&')
    // console.log('filter array 1')
    // console.log(filterArray)
    filterArray.forEach(filterProperty => {
        filterProperty = filterProperty.split('=')
        filterObject[filterProperty[0]] = filterProperty[1]
    })
    // console.log('filter array 2')
    // console.log(filterArray)
    // console.log('filter object')
    // console.log(filterObject)
    const foundCampaigns = await Campaign.find(filterObject)
    // console.log(foundCampaigns)
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
        //must be in this format "1990-01-21"
        const editableCampaign = foundCampaign
        const rawDate = foundCampaign.startDate
        const year = rawDate.getFullYear()
        const month = rawDate.getMonth() + 1
        let monthString = month.toString()
        if (month < 10) {
            monthString = '0' + month.toString()
        }
        const day = rawDate.getDay()
        let dayString = day.toString()
        if (day < 10) {
            dayString = '0' + day.toString()
        } 
        const prettyDate = (year + "-" + monthString + "-" + dayString)
        console.log(prettyDate)
        editableCampaign.startDate = prettyDate // THIS LINE NOT WORKING
        console.log(foundCampaign)
        res.render('campaigns/edit.ejs', {
            campaign: editableCampaign
        })
    })
})
// router.get('/:id/edit', (req, res) => {
//     Campaign.findById(req.params.id, (err, foundCampaign) => {
//         res.render('campaigns/edit.ejs', {
//             campaign: foundCampaign
//         })
//     })
// })
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