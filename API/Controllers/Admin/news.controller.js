const News = require("../../../Models/news")
const cloudinary = require("../../../config/cloudinary.config")
const { createUniqueSlug } = require("../../../utils/slugHelper");
module.exports.index = async (req, res) => {

    const news = await News.find()

    res.json(news)

}

module.exports.create = async (req, res) => {
    try {
        const news = await News.find();
        const filterNews = news.filter(c => {
            return c.name.toUpperCase() === req.body.name.toUpperCase().trim();
        })
        if (filterNews.length > 0) {
            res.json({ msg: "Tin tức đã tồn tại" })
        } else {
            let imageUrl = req.file?.path || "";
            var createNews = new News();
            req.body.name = req.body.name.toLowerCase().replace(/^.|\s\S/g, a => { return a.toUpperCase() })
            const uniqueSlug = await createUniqueSlug(req.body.name, req.body.id);
            createNews.name = req.body.name;
            createNews.slug = uniqueSlug;
            createNews.content = req.body.content
            createNews.short_content = req.body.short_content
            createNews.image = imageUrl
            createNews.save();
            res.json({ msg: "Thêm tin tức thành công" })
        }
    } catch (error) {
        res.json(error)
    }
}
module.exports.update = async (req, res) => {
    const uniqueSlug = await createUniqueSlug(req.body.name, req.body.id);
    let imageUrl = req.body.image || req.file?.path;
    await News.updateOne({ _id: req.body.id }, {
        name: req.body.name,
        slug: uniqueSlug,
        content: req.body.content,
        short_content: req.body.short_content,
        image: imageUrl,
    })

    res.json({ msg: "Bạn đã cập nhật thành công" })
}
module.exports.detail = async (req, res) => {
    const id_news = req.params.id
    const news = await News.findOne({ _id: id_news })
    if (!news) {
        return res.status(404).json({ message: "Tin tức không tồn tại" });
    }
    res.json(news)
}