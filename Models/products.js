var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    {
        id_category: {
            type: String,
            ref: 'Category'
        },
        name: String,
        slug: String,
        price: String,
        image: String,
        content: String,
        gallery: [{ url: String }],
    }, { timestamps: true }
);

var Products = mongoose.model('Products', schema, 'products');

module.exports = Products;