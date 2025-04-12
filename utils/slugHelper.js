const Products = require("../Models/products"); // Import model sản phẩm
const removeVietnameseTones = (str) => {
    return str
        .normalize("NFD") // Tách dấu
        .replace(/[\u0300-\u036f]/g, "") // Xóa dấu
        .replace(/đ/g, "d").replace(/Đ/g, "D") // Chuyển đ -> d
        .replace(/[^a-zA-Z0-9\s-]/g, "") // Xóa ký tự đặc biệt
        .replace(/\s+/g, "-") // Chuyển khoảng trắng thành dấu "-"
        .replace(/-+/g, "-") // Xóa dấu "-" thừa
        .toLowerCase();
};
const createUniqueSlug = async (name, productId = null) => {
    let slug = removeVietnameseTones(name.trim());

    let uniqueSlug = slug;
    let count = 1;

    while (await Products.exists({ slug: uniqueSlug, _id: { $ne: productId } })) {
        uniqueSlug = `${slug}-${count}`;
        count++;
    }

    return uniqueSlug;
};

module.exports = { createUniqueSlug };
