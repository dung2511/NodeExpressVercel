var express = require('express')

var router = express.Router()

var messenger = require('../Controllers/messenger.controller')

router.get('/', messenger.index)

router.post('/send', messenger.send)

router.post('/conversation', messenger.conversation)

module.exports = router