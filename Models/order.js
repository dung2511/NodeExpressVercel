var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    {

        id_user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users"
        },
        fullname: String,
        phone: String,
        email: String,
        list_product: [
            {
                id_product: {
                    type: String,
                    ref: "Products"
                },
                quantity: {
                    type: Number,
                    min: 1
                }

            }
        ],
        total_price: Number,
        status: {
            type: String,
            enum: ["Đang xử lý", "Đang vận chuyển", "Đã giao", "Đã hủy"],
            default: "Đang xử lý",
        },
        shipping_address: {
            city_id: { type: Number, ref: "City" },
            district_id: { type: Number, ref: "District" },
            award_id: { type: Number, ref: "Award" },
            address: { type: String, required: true },
        },
        payment_method: { type: String, enum: ["Thanh toán tận nơi", "Credit Card", "PayPal"], default: "Thanh toán tận nơi", required: true },

    }, { timestamps: true }
);

var Order = mongoose.model('Order', schema, 'orders');

module.exports = Order;