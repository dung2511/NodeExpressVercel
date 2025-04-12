const Products = require('../../Models/products')
const cloudinary = require("../../config/cloudinary.config")

//Get All Product
module.exports.index = async (req, res) => {

    const products = await Products.find()

    res.json(products)

}

// Add Product
module.exports.addProduct = async (req, res) => {
    try {
        const { name, price, category } = req.body;
        const img = req.file;
        // upload Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(img.path);
        const imgUrl = uploadResponse.secure_url;

        const newProduct = new Products({
            name,
            price,
            category,
            img: imgUrl
        });
        await newProduct.save();
        res.status(200).json({ message: 'Sản phẩm được thêm thành công', newProduct });
    } catch (error) {
        res.status(100).json({ message: 'Thêm sản phẩm thất bại', error });
    }
}

//Get Category Product
module.exports.category = async (req, res) => {

    const id_category = req.query.id_category

    let products_category

    if (id_category === 'all') {
        products_category = await Products.find()
    } else {
        products_category = await Products.find({ id_category: id_category })
    }

    res.json(products_category)
}

//Get Detail Product
module.exports.detail = async (req, res) => {

    const { slug } = req.params
    const products = await Products.findOne({ slug })
    if (!products) {
        return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }
    res.json(products)
}

//Pagination Phát Triển Thêm Chức năng Search và Phân Loại Sản Phẩm
module.exports.pagination = async (req, res) => {

    //Lấy page từ query
    const page = parseInt(req.query.page) || 1

    //Lấy số lượng từ query
    const numberProduct = parseInt(req.query.count) || 1

    //Lấy key search từ query
    const keyWordSearch = req.query.search

    //Lấy category từ query
    const category = req.query.category

    //Lấy sản phẩm đầu và sẩn phẩm cuối
    var start = (page - 1) * numberProduct
    var end = page * numberProduct

    var products

    //Phân loại điều kiện category từ client gửi lên
    if (category === 'all') {
        products = await Products.find()
    } else {
        products = await Products.find({ category: category })
    }

    var paginationProducts = products.slice(start, end)


    if (!keyWordSearch) {

        res.json(paginationProducts)

    } else {
        var newData = paginationProducts.filter(value => {
            return value.name.toUpperCase().indexOf(keyWordSearch.toUpperCase()) !== -1 ||
                value.price.toUpperCase().indexOf(keyWordSearch.toUpperCase()) !== -1 || value.category.toUpperCase().indexOf(keyWordSearch.toUpperCase()) !== -1
        })

        res.json(newData)
    }

    res.send("Thanh Cong")

}

module.exports.getProductNewArrivals = async (req, res) => {
    const products = await Products.find().sort({ createdAt: -1 }).limit(4)
    res.json(products)
}
module.exports.getProductSale = async (req, res) => {
    const products = await Products.find({ sale: { $gt: 0 } }).limit(4)
    res.json(products)
}