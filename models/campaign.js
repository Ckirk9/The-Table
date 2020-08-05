const mongoose = require('mongoose')
const Session = require('./session')

const campaignSchema = new mongoose.Schema ({
    name: {type: String, required: true },
    description: {type: String, required: true },
    dungeonMaster: {type: String, required: true },
    //Genre, Game System, Difficulty
    genre: {type: String, required: true},
    gameSystem: {type: String, required: true},
    difficulty: {type: String, required: true},
    players: {type: String, required: false },
    openSlots: {type: Number, required: true },
    startDate: {type: Date, required: true }, 
    sessions: [{type: mongoose.Schema.Types.ObjectId, 
        ref: 'Session',
        required: false
    }]
})

const Campaign = mongoose.model('Campaign', campaignSchema)
module.exports = Campaign