require("dotenv").config();
const express = require('express')
const app = express()

const cors = require("cors");
const port = process.env.PORT

app.use(express.json());
// API
const productAPI = require('./API/Router/products.router')
const userAPI = require('./API/Router/users.router')
const commentAPI = require('./API/Router/comment.router')
const categoryAPI = require("./API/Router/category.router")
const OrderAPI = require('./API/Router/order.router')
const locationAPI = require("./API/Router/location.router")
const newsAPI = require("./API/Router/news.router")


// API Admin

const productAdminAPI = require("./API/Router/Admin/products.router")
const categoryAdminAPI = require("./API/Router/Admin/category.router")
const newsAdminAPI = require("./API/Router/Admin/news.router")

const mongoose = require("mongoose");
const mongoURI = process.env.MONGOURI;

mongoose.connect(mongoURI, {
  useFindAndModify: false,
  useCreateIndex: false,
})
  .then(() => console.log("Kết nối thành công"))
  .catch(() => console.log("Kết nối thất bại"));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/static', express.static('public'))

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

// Tạo API
app.use('/api/products', productAPI)
app.use('/api/news', newsAPI)
app.use('/api/users', userAPI)
app.use('/api/comment', commentAPI)
app.use('/api/category', categoryAPI)
app.use('/order', OrderAPI)
app.use('/location', locationAPI)

// Tạo API Admin

app.use("/api/admin/products", productAdminAPI)
app.use("/api/admin/category", categoryAdminAPI)
app.use("/api/admin/news", newsAdminAPI)


app.listen(port, () => {
  console.log('listening on *:8080');
});