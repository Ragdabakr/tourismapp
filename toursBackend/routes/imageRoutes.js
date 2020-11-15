

const express = require('express');
const imageController = require('./../controllers/imageController');
const authController = require('./../controllers/authController');
const router = express.Router();


router
    .route('/upload-single-image')
    .post(authController.protect, imageController.uploadSingleImage);

module.exports = router;
