const mongoose = require('mongoose')

const campaignSchema = mongoose.Schema ({
    name: {type: String, required: true },
    description: {type: String, required: true },
    dungeonMaster: {type: String, required: true },
    players: {type: String, required: false },
    openSlots: {type: Number, required: true },
    startDate: {type: String, required: true }, // Look into using a Date for this!
    // Sessions: [{type: _id, required: false },]
})

const Campaign = mongoose.model('Campaign', campaignSchema)
module.exports = Campaign