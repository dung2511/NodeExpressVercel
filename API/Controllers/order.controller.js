
const Order = require('../../Models/order')
const mongoose = require("mongoose")
// Hiển thị chi tiết hóa đơn
// Phương thức GET
module.exports.detail = async (req, res) => {

    const id_order = req.params.id

    const detail_order = await Order.find({ id_order: id_order }).populate('id_product')

    res.json(detail_order)

}

// Phuong Thuc Post
module.exports.post_detail_order = async (req, res) => {
    const { id_user, fullname, phone, email, shipping_address, list_product, total_price, status, payment_method } = req.body

    const newOrder = new Order({
        id_user, fullname, phone, email, shipping_address, list_product, total_price, status, payment_method
    })
    await newOrder.save();
    res.status(201).json({ msg: "Đặt hàng thành công" });

}

module.exports.getAllOrdersByUser = async (req, res) => {
    const { id_user } = req.params
    const orders = await Order.find({ id_user: id_user }).populate("id_user", "name phone email")

    res.status(200).json(orders);
}
module.exports.getOrderById = async (req, res) => {
    const id_order = req.params.id
    const order = await Order.findById(id_order)
        .populate("id_user", "phone email")
        .populate("list_product.id_product", "name price")
    res.status(200).json(order)
}