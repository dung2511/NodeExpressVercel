const News = require("../../Models/news")

module.exports.index = async (req, res) => {

    const news = await News.find()

    res.json(news)

}
module.exports.detail = async (req, res) => {
    const { slug } = req.params;
    const news = await News.findOne({ slug: slug })
    res.json(news)
}
module.exports.home = async (req, res) => {
    const news = await News.find().limit(4)

    res.json(news)
}