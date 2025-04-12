
var express = require('express');

var emailAPI = require('../Controllers/email.controller');

var router = express.Router()

router.post('/', emailAPI.sendmail)

module.exports = router