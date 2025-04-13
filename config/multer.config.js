const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary.config");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, res) => {
        const folder = req.body.folder || ""
        return {
            folder: folder,
            format: async (req, file) => "png",
            public_id: (req, file) => `${Date.now()}-${file.originalname}`,
        }
    },
});

const upload = multer({ storage: storage });

module.exports = upload;
