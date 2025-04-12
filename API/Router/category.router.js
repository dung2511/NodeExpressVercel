var express = require('express')

var router = express.Router()

const CategoryController = require('../Controllers/category.controller')

router.get('/', CategoryController.index)

router.get("/category-home", CategoryController.categoryHome)

router.get('/:slug', CategoryController.detail)


module.exports = router