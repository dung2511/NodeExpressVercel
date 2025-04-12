var express = require('express')

var router = express.Router()

const Products = require('../../Controllers/Admin/products.controller')
const upload = require('../../../config/multer.config')

router.get('/', Products.index)
router.patch("/update", upload.single('file'), Products.update)
router.patch("/create", upload.single('file'), Products.create)
router.get("/:id", Products.detail)
module.exports = router