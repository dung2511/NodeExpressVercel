const Category = require("../../../Models/category");
const Products = require("../../../Models/products")

module.exports.index = async (req, res) => {
    const category = await Category.find();
    res.json(category)
}