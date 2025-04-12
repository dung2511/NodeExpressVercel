const mongoose = require("mongoose");

const WardSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: Number, required: true, unique: true },
    codename: { type: String, required: true },
    division_type: { type: String, required: true },
    short_codename: { type: String, required: true }
});

const DistrictSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: Number, required: true, unique: true },
    codename: { type: String, required: true },
    division_type: { type: String, required: true },
    short_codename: { type: String, required: true },
    wards: [WardSchema]
});

const LocationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: Number, required: true, unique: true },
    codename: { type: String, required: true },
    division_type: { type: String, required: true },
    phone_code: { type: Number, required: true },
    districts: [DistrictSchema]
});
const Location = mongoose.model("Location", LocationSchema, 'location');
module.exports = Location
