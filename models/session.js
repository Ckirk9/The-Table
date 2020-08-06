const mongoose = require('mongoose')
const Campaign = require('./campaign')

const sessionSchema = new mongoose.Schema ({
    author: {type: String, required: true },
    title: { type: String, required: true },
    body: {type: String, required: true},
    sessionDate: {type: Date, required: true},
    campaign: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Campaign',
        required: true
    }]
})

const Session = mongoose.model('Session', sessionSchema)

module.exports = Session 