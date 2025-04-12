var express = require('express')

var router = express.Router()

const CategoryController = require('../../Controllers/Admin/category.controller')
const upload = require('../../../config/multer.config')

router.get('/', CategoryController.index)
// router.get("/:id", Products.detail)
// router.post('/add', upload.single('img1'), Products.addProduct);
module.exports = router