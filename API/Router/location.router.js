const express = require("express")
var router = express.Router()

const Location = require('../Controllers/location.controller')

router.get("/cities", Location.allCity)
router.get("/cities/:cityCode/districts", Location.getDistrictByCity)
router.get("/cities/:cityCode/districts/:districtCode/awards", Location.getAwardsByDistrict)

module.exports = router