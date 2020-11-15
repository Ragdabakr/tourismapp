const express = require('express');
const busController = require('./../controllers/busController');
const Bus = require('./../models/busModel');
const authController = require('./../controllers/authController');

const router = express.Router();

//router.use(authController.protect);

//router.use(authController.restrictTo('admin', 'lead-guide'));

router
    .route('/')
    .get(busController.getAllbuses)
    .post(busController.createBus);

router
    .route('/:id')
    .get(busController.getBus)
    .patch(busController.updateBus)
    .delete(busController.deleteBus);


module.exports = router;