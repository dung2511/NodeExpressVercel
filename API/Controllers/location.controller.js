const Location = require("../../Models/location")
module.exports.allCity = async (req, res) => {
    try {
        const cities = await Location.find({}, "name code codename");
        res.status(200).json(cities);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy danh sách thành phố", error });
    }
}
module.exports.getDistrictByCity = async (req, res) => {
    try {
        const { cityCode } = req.params;

        const city = await Location.findOne({ code: cityCode }, { "district.awards": 0 });
        if (!city) return res.status(404).json({ message: "Không tìm thấy thành phố" });
        res.status(200).json(city.districts);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy danh sách quận", error });
    }
}
module.exports.getAwardsByDistrict = async (req, res) => {
    try {
        const { cityCode, districtCode } = req.params;
        const city = await Location.findOne({ code: cityCode });
        if (!city) return res.status(404).json({ message: "Không tìm thấy thành phố" });

        const district = city.districts.find((d) => d.code === Number(districtCode));
        if (!district) return res.status(404).json({ message: "Không tìm thấy quận / huyện" });

        res.status(200).json(district.wards);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy danh sách xã / phường", error });
    }
};