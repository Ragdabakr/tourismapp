const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const reviewController = require('./../controllers/reviewController');
const router = express.Router();
const multer = require('multer');

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword', authController.resetPassword);

router
    .route('/create-profile')
    .post(authController.protect,userController.createUserProfile);

// router.use(authController.protect);

//Work if user is logged in work for users
router.patch('/me',userController.getMe, 
                  userController.getUser);
router.patch('/updateMe',userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);
router.patch('/updateMyPassword',authController.updatePassword);


// work with admin dashboard
// router.use(authController.restrictTo('admin'));
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser)
  .delete(userController.deleteAllUsers);

router
  .route('/:id')
  .get(authController.protect ,authController.restrictTo('admin') ,userController.getUser)
  .patch(authController.protect ,authController.restrictTo('admin') ,userController.updateUser)
  .delete(authController.protect ,authController.restrictTo('admin') ,userController.deleteUser)



module.exports = router;