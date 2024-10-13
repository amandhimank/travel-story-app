// const multer = require('multer');
// const path = require('path');

// // Storage Configuration
// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, "./uploads/"); // Destination folder for storing uploaded files
//     },
//     filename: function(req, file, cb) {
//         cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
//     },
// });

// // Filte filter to accept only images
// const fileFilter = (req, file, cb) => {
//     if (file.mimetype.startsWith("image/")) {
//         cb(null, true);
//     }
//     else {
//         cb(new Error("Only images are allowed"), false);
//     }
// };

// // Initialize Multer Instance
// const upload = multer({ storage, fileFilter });
// module.exports = upload;

const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up Cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads', // Folder name in Cloudinary
        allowed_formats: ['jpg', 'png', 'jpeg'], // Allowed file formats
        public_id: (req, file) => Date.now() + '-' + file.originalname, // Unique file name
    },
});

// Initialize Multer with Cloudinary storage
const upload = multer({ storage });
module.exports = upload;
