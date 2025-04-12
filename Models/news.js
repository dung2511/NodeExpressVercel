const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    // id_category: {
    //     type: String,
    //     ref: 'NewsCategory'
    // },
    name: String,
    slug: String,
    image: String,
    content: String,
    short_content: String

}, { timestamps: true })

const News = mongoose.model("News", schema, 'news')
module.exports = News