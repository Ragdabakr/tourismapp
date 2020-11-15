const Review = require('./../models/reviewModel');
const factory = require('./handlerFactory');
// const catchAsync = require('./../utils/catchAsync');

exports.setTourUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);


// http://localhost:3000/api/v1/tours/5ead8c7f984f6c368c6c12a0/reviews/
// exports.createReview = catchAsync(async  (req, res) => {
//   const tour = await Tour.findById(req.params.tourId);
//   const average = tour.ratingsAverage;
//   const  review = await Review.create(req.body); 
//   tour.ratingsQuantity = tour.ratingsQuantity + 1;
//   tour.ratingsAverage = (average + review.rating) / tour.ratingsQuantity;
//   tour.save({ validateBeforeSave: false });
//   res.status(201).json({
//    status: 'success',
//    data: {
//     data: review
//     }
//    });   
//  });

// router
//   .route('/:tourId/reviews/:reviewId')
//   .patch(reviewController.updateReview );
// http://localhost:3000/api/v1/tours/5ead8c7f984f6c368c6c12a0/reviews/5ead8c8e984f6c368c6c12a1
// exports.updateReview =  catchAsync(async (req, res , next) => {
//   const tourId = req.params.tourId;
//   const reviewId = req.params.reviewId;
//   const tour = await Tour.findById(req.params.tourId);
//   const average = tour.ratingsAverage; 
//   const review = await Review.findByIdAndUpdate(reviewId, req.body, {
//     new: true,
//     runValidators: true
//   });
//   if(!review){
//     return next(new AppError ('no document found with this id', 404));
//   }
 
//   tour.ratingsQuantity = tour.ratingsQuantity + 1;
//   tour.ratingsAverage = (average + review.rating) / tour.ratingsQuantity;
//   tour.save({ validateBeforeSave: false });
//   res.status(200).json({
//     status: 'success',
//     data: {
//       data : review
//     }
//   });
// });
