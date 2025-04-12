var express = require('express')

var router = express.Router()

const Products = require('../Controllers/products.controller')
const upload = require('../../config/multer.config')

router.get('/', Products.index)
router.get('/category', Products.category)
router.get('/pagination', Products.pagination)
router.get("/new-arrivals/", Products.getProductNewArrivals)
router.get("/product-sale/", Products.getProductSale)
router.get('/:slug', Products.detail)
router.post('/add', upload.single('img1'), Products.addProduct);
module.exports = router