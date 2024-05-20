const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(__dirname, '../uploads/');

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.not() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, uniqueSuffix + ext)
    }
});

const upload = multer({
    storage: storage,

    fileFilter: function (req, file, cb) {

        const acceptedMineTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp'];


        if (acceptedMineTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('only JPEG, PNG GIF, and BMP image files are allowed'))
        }
    }
});


router.post('/', upload.single('image'), productController.createProduct);

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductsById);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.post('/add-to-cart', productController.addToCart);


module.exports = router;