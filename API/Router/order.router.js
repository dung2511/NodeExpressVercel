var express = require('express')

var router = express.Router()

const Order = require('../Controllers/order.controller')

// Hiển thị danh sách detail
router.get('/:id', Order.detail)

router.post('/', Order.post_detail_order)
router.get("/user/:id_user", Order.getAllOrdersByUser);
router.get("/detail/:id", Order.getOrderById)
module.exports = router