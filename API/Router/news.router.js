const express = require('express');
const router = express.Router();

const NewsController = require("../Controllers/news.controller")

router.get("/", NewsController.index)
router.get("/home", NewsController.home)

router.get('/:slug', NewsController.detail)

module.exports = router