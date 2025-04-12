var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    {
        name: String,
        slug: String,
        image: String,
        is_home: Number
    }, {
    timestamps: true
}
);

var Category = mongoose.model('Category', schema, 'category');

module.exports = Category;