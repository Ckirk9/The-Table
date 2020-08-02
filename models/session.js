const mongoose = require('mongoose')

const sessionSchema = mongoose.Schema ({
    author: {type: String, required: true },
    title: { type: String, required: true },
    body: {type: String, required: true},
    sessionDate: {type: Date, required: true}
    // creating a relationship through a reference
    // campaigns: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Campaign'
    // }]

})

const Session = mongoose.model('Session', sessionSchema)

module.exports = Session 