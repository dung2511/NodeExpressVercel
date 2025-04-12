const Products = require("../../../Models/products")
const cloudinary = require("../../../config/cloudinary.config")
const { createUniqueSlug } = require("../../../utils/slugHelper");
module.exports.index = async (req, res) => {

    const products = await Products.find();
    res.json(products)
}
module.exports.detail = async (req, res) => {
    const id_product = req.params.id
    const products = await Products.findOne({ _id: id_product })
    if (!products) {
        return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }
    res.json(products)
}
module.exports.update = async (req, res) => {
    const uniqueSlug = await createUniqueSlug(req.body.name, req.body.id);
    var imageUrl = req.body.image;
    if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "products"
        })
        imageUrl = result.secure_url
    }
    await Products.updateOne({ _id: req.body.id }, {
        name: req.body.name,
        slug: uniqueSlug,
        content: req.body.content,
        image: imageUrl,
        price: Number(req.body.price),
        sale: Number(req.body.sale),
        id_category: req.body.id_category,
    })

    res.json({ msg: "Bạn đã cập nhật thành công" })
}
module.exports.create = async (req, res) => {
    const products = await Products.find();
    const productFilter = products.filter(c => {
        return c.name.toUpperCase() === req.body.name.toUpperCase().trim();
    })
    if (productFilter.length > 0) {
        res.json({ msg: "Sản phẩm đã tồn tại" })
    } else {
        var imageUrl;
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "products"
            })
            imageUrl = result.secure_url
        }
        var newProduct = new Products();
        req.body.name = req.body.name.toLowerCase().replace(/^.|\s\S/g, a => { return a.toUpperCase() })
        const uniqueSlug = await createUniqueSlug(req.body.name, req.body.id);
        newProduct.name = req.body.name;
        newProduct.slug = uniqueSlug;
        newProduct.content = req.body.content
        newProduct.image = imageUrl
        newProduct.price = Number(req.body.price)
        newProduct.sale = Number(req.body.sale)
        newProduct.id_category = req.body.id_category
        newProduct.save();
        res.json({ msg: "Bạn đã thêm sản phẩm thành công" })
    }
} 