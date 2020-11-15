const User = require('./../models/userModel');
const async = require('async');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary');

// ---------------- Add Post---------------- 

cloudinary.config({
    cloud_name: 'reg1rego3',
    api_key: '277578515871442',
    api_secret: 'CWT6HwmwzFWHFvX0M_JVZtMsE9g',
    api_enviroment_variable: 'CLOUDINARY_URL=cloudinary://277578515871442:CWT6HwmwzFWHFvX0M_JVZtMsE9g@reg1rego3'
});

// ---------------- Upload images--------------- 



exports.uploadSingleImage = catchAsync(async (req, res) => {
    const foundUser = req.user;
    await cloudinary.uploader.upload(req.body.image, async (result) => {
        foundUser.profile.profileImage.imageId = result.public_id;
        foundUser.profile.profileImage.imageVersion = result.version;
        foundUser.save();
    });

    res.status(204).json({
        status: 'success',
        data: foundUser
    });
});


  // await cloudinary.uploader.upload(req.body.data.image, async (result) => {
    //    newTour.imageCover.imageId = result.public_id;
    //    newTour.imageCover.imageVersion = result.version;
    //    newTour.save();
   // });

   // for (let i = 0; i < req.body.data.images.length; i++) {
      //  await cloudinary.uploader.upload(req.body.data.images[i], async (result) => {
      //      newTour.images.imageId = result.public_id;
      //      newTour.images.imageVersion = result.version;
      //      newTour.save();
      //  });

   // }