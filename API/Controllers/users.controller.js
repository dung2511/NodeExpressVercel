
const Users = require('../../Models/users')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
require("dotenv").config();

module.exports.index = async (req, res) => {

    const users = await Users.find()

    res.json(users)

}
module.exports.user = async (req, res) => {

    const id = req.params.id

    const user = await Users.findOne({ _id: id })

    if (!user) {
        res.status(404).json({ msg: "Không tìm thấy tài khoản" })
    } else {
        res.status(201).json(user)
    }



}
module.exports.detail = async (req, res) => {

    const email = req.query.email

    const username = req.query.username

    const password = req.query.password

    const query = [{ username: username }, { email: email }]

    const user = await Users.findOne({ $or: query })

    if (user.email !== email) {
        res.send("Khong Tìm Thấy User")
    } else {
        if (user.password === password) {
            res.json(user)
        } else {
            res.send("Sai Mat Khau")
        }
    }

}

module.exports.create = async (req, res) => {
    const { fullname, email, password, phone, confirmPassword } = req.body;
    const validateEmail = (email) => {
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    const validatePhoneNumber = (number) => {
        const phoneNumberPattern = /^0[3-9]\d{8}$/;
        return phoneNumberPattern.test(number);
    };
    try {
        const existingEmailUser = await Users.findOne({ email });
        const existingPhoneUser = await Users.findOne({ phone });
        const errors = [
            { condition: !fullname, msg: "Vui lòng nhập họ tên !!" },
            { condition: !email, msg: "Vui lòng nhập email !!" },
            { condition: email && !validateEmail(email), msg: "Email không hợp lệ !!" },
            { condition: existingEmailUser, msg: "Email đã tồn tại !!" },
            { condition: !phone, msg: "Vui lòng nhập số điện thoại !!" },
            { condition: phone && !validatePhoneNumber(phone), msg: "Số điện thoại không hợp lệ !!" },
            { condition: existingPhoneUser, msg: "Số điện thoại đã tồn tại !!" },
            { condition: !password, msg: "Vui lòng nhập mật khẩu !!" },
            { condition: password && password.length < 8, msg: "Mật khẩu phải có ít nhất 8 ký tự !!" },
            { condition: !confirmPassword, msg: "Vui lòng nhập xác nhận mật khẩu !!" },
            { condition: password !== confirmPassword, msg: "Mật khẩu không khớp !!" },
        ];
        const error = errors.find((error) => error.condition);
        if (error) return res.status(400).json({ msg: error.msg });
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new Users({
            fullname,
            email,
            password: hashedPassword,
            phone
        });

        await newUser.save();
        res.status(201).json({ msg: "Đăng ký thành công" });
    } catch (err) {
        res.status(500).json({ msg: "Lỗi server" });
    }

}
module.exports.login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const validateEmail = (email) => {
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    const errors = [
        { condition: !email, msg: "Vui lòng nhập email !!" },
        { condition: email && !validateEmail(email), msg: "Email không hợp lệ !!" },
        { condition: !password, msg: "Vui lòng nhập mật khẩu !!" },
    ];
    const error = errors.find((error) => error.condition);
    if (error) return res.status(400).json({ msg: error.msg });
    try {
        const user = await Users.findOne({ email: email });
        if (!user) {
            res.status(400).json({
                msg: "Không tìm thấy tài khoản"
            })
        } else {
            const auth = await bcrypt.compare(password, user.password)
            if (auth) {
                var token = jwt.sign(user._id.toJSON(), process.env.JWT_SECRET)
                res.json({ msg: "Đăng nhập thành công", id_user: user._id, jwt: token })
            } else {
                res.status(400).json({
                    msg: "Mật khẩu không chính xác"
                })
            }
        }
    } catch (error) {
        return res.status(500).json({ msg: "Lỗi server", error: err.message });
    }

}