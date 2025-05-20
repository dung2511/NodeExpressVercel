var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    {
        password: String,
        fullname: String,
        gender: String,
        email: String,
        phone: String,
        city_id: { type: Number, ref: "City" },
        district_id: { type: Number, ref: "District" },
        award_id: { type: Number, ref: "Award" },
        address: { type: String, required: true },

    }
);

var Users = mongoose.model('Users', schema, 'users');

module.exports = Users;