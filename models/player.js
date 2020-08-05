const mongoose = require('mongoose')
const Session = require('./session')
const Campaign = require('./campaign')

const playerSchema = new mongoose.Schema({
    username: {type: String, required: true },
    bio: {type: String, required: true },
    campaignsDMing: [{type: mongoose.Schema.Types.ObjectId, 
        ref: 'Campaign',
        required: false
    }],
    campaignsPlaying: [{type: mongoose.Schema.Types.ObjectId, 
        ref: 'Campaign',
        required: false
    }],
    authoredSessions: [{type: mongoose.Schema.Types.ObjectId, 
        ref: 'Session',
        required: false
    }]
})

const Player = mongoose.model('Player', playerSchema)
module.exports = Player