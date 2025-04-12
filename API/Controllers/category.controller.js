const Category = require('../../Models/category')

module.exports.index = async (req, res) => {

    const category = await Category.find({ is_home: 1 }).limit(4)

    res.json(category)

}
module.exports.detail = async (req, res) => {
    const { slug } = req.params;
    const category = await Category.findOne({ slug })
    if (!category) {
        return res.status(404).json({ msg: "Danh mục không tồn tại" });
    }
    res.json(category)
}
module.exports.categoryHome = async (req, res) => {
    try {
        const category = await Category.find({ is_home: 1 }).limit(4);
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
}