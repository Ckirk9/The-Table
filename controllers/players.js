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
router.get('/:id', (req,res) => {
    Player.findById(req.params.id, req.body, (err, foundPlayer) => {
        console.log(foundPlayer)
        res.render('players/show.ejs', {
            player: foundPlayer,
        })
    })
})




// EXPORTS
module.exports = router