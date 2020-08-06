// Require Statements
const express = require('express')
const router = express.Router()
const Player = require('../models/player')
const Campaign = require('../models/campaign') //needed for
const Session = require('../models/session') //needed for
const mongoose = require('mongoose')

// ROUTES

// INDEX
router.get('/', (req, res) => {
    Player.find({}, (err,foundPlayers) => {
        console.log(foundPlayers)
        res.render('players/index', {
            players: foundPlayers
        })
    })
})

// NEW
router.get('/new', (req, res) => {
    res.render('players/new.ejs')
})
//CREATE
router.post('/', (req, res) => {
    Player.create(req.body,(err, createdPlayer) => {
        console.log(createdPlayer)
        console.log(err)
        res.redirect('/players') // + createdPlayer._id)
    })
})

// SHOW
router.get('/:id', async (req,res) => {
    // Player.findById(req.params.id, req.body, (err, foundPlayer) => {
    //     console.log(foundPlayer)
    //     res.render('players/show.ejs', {
    //         player: foundPlayer,
    //     })
    // })
    // const foundPlayer = Player.findById(req.params.id)
    // const campaignsDMingArray = []
    // player.campaignsDMing.forEach(id => {
    //     let campaignDMing = await Campaign.findById(id)
    //     campaignsDMingArray.push(campaignDMing)
    // });
    // console.log(campaignsDMingArray)
    // res.render('players/show.ejs', {
    //     //         player: foundPlayer,
    //     //     })
    const foundPlayer = await Player.findById(req.params.id)//, req.body, (err, foundPlayer) => {
    .populate({path: 'campaignsDMing'})   
    console.log(foundPlayer)
    res.render('players/show.ejs', {
        player: foundPlayer,
    })
})




// EXPORTS
module.exports = router