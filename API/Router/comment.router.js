var express = require('express');

var Comment = require('../Controllers/comment.controller');

var router = express.Router()

router.get('/', Comment.index)
router.get('/product/:id', Comment.getCommentByIdProduct)

router.post('/:id', Comment.post_comment)

module.exports = router