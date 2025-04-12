var express = require('express')

var router = express.Router()

const Users = require('../Controllers/users.controller')

router.get('/', Users.index)

router.get('/:id', Users.user)

router.get('/detail/login', Users.detail)

// router.post('/signup', Users.signup)

router.post('/create', Users.create)
router.post("/login", Users.login)

module.exports = router