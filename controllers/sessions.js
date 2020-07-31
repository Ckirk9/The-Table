const express = require('express')
const router = express.Router()

// path to sessions index
router.get('/', (req, res) => {
    res.render('sessions/index.ejs')
}) 


module.exports = router