const express = require('express');
const router = express.Router();

const NewsController = require("../../Controllers/Admin/news.controller");
const upload = require('../../../config/multer.config');

router.get("/", NewsController.index)

router.post('/create', upload.single('file'), NewsController.create)
router.patch("/update", upload.single('file'), NewsController.update)
router.get("/:id", NewsController.detail)
module.exports = router