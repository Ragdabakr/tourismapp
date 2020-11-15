const express = require('express');
const tourController = require('./../controllers/tourController');
const authController = require('./../controllers/authController');
const reviewController = require('./../controllers/reviewController');
const reviewRoutes = require('./../routes/reviewRoutes');
const router = express.Router();

// router
//   .route('/:tourId/reviews')
//   .post(
//     authController.protect ,
//     authController.restrictTo('user'),
//     reviewController.createReview);

    router.use('/:tourId/reviews' , reviewRoutes);

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours,tourController.getAllTours);
  router.route('/tour-stats').get(tourController.getTourStats);
  router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);
  router.route('/test').get(tourController.getTest);


  router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get( tourController.getTourswithin);

  router.route('/distances/:latlng/unit/:unit')
  .get(tourController.getDistances);

router
  .route('/')
  .get( tourController.getAllTours)
  .post(tourController.createTour)
  // .post(authController.protect ,
  //       authController.restrictTo('admin' , 'user'), 
  //       tourController.createTour)

  .delete(authController.protect ,
          authController.restrictTo('admin' , 'lead-guide'), 
          tourController.deleteAllTours);

          router.use(authController.protect ,  authController.restrictTo('admin' , 'user'));
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

  // router
  // .route('/:tourId/reviews/:reviewId')
  // .patch(reviewController.updateReview );

module.exports = router;