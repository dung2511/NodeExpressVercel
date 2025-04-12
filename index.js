require("dotenv").config();
const express = require('express')
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http);

const cors = require("cors");
const port = process.env.PORT

const Messenger = require('./Models/messenger');

// API
const productAPI = require('./API/Router/products.router')
const userAPI = require('./API/Router/users.router')
const cartAPI = require('./API/Router/carts.router')
const historiesAPI = require('./API/Router/histories.router')
const emailAPI = require('./API/Router/email.router')
const messengerAPI = require('./API/Router/messenger.router')
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
const { log } = require('console');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

// Tạo API
app.use('/api/products', productAPI)
app.use('/api/news', newsAPI)
app.use('/api/users', userAPI)
app.use('/carts', cartAPI)
app.use('/histories', historiesAPI)
app.use('/email', emailAPI)
app.use('/messenger', messengerAPI)
app.use('/api/comment', commentAPI)
app.use('/api/category', categoryAPI)
app.use('/order', OrderAPI)
app.use('/location', locationAPI)

// Tạo API Admin

app.use("/api/admin/products", productAdminAPI)
app.use("/api/admin/category", categoryAdminAPI)
app.use("/api/admin/news", newsAdminAPI)


io.on("connection", (socket) => {
  console.log(`Có người vừa kết nối, socketID: ${socket.id}`);

  //Server nhận key send_message với value data do người dùng gửi lên
  socket.on("send_message", (data) => {
    console.log(data.name + ": " + data.message);

    //Sau đó nó sẽ update lại database bên phía người nhận
    //Vì 1 bên gửi 1 bên nhận nên id_user đôi ngược nhau và category cũng vậy
    const newData = {
      id: Math.random().toString(),
      message: data.message,
      name: data.name,
      category: "receive",
    };

    console.log(newData.message);

    const postData = async () => {
      const messenger = await Messenger.findOne({
        id_user1: data.id_user2,
        id_user2: data.id_user1,
      });

      messenger.content.push(newData);

      messenger.save();
    };

    postData();

    //Xử lý xong server gửi ngược lại client thông qua socket với key receive_message
    socket.broadcast.emit("receive_message");
  });

  // Server nhận key send_order với value data do người dùng gửi lên
  // Phần này dùng để xử lý bên admin history biết được có người vừa đặt hàng
  socket.on('send_order', (data) => {
    console.log(data)

    //Xử lý xong server gửi ngược lại client admin thông qua socket với key receive_order
    socket.broadcast.emit("receive_order", data);
  })

})

http.listen(port, () => {
  console.log('listening on *:8080');
});