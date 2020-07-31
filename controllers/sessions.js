const express = require('express')
const router = express.Router()

// path to sessions index
router.get('/', (req, res) => {
    res.render('sessions/index.ejs')
}) 

// path to sessions new
router.get('/new', (req, res) => {
    res.render('sessions/new.ejs')
})

module.exports = router