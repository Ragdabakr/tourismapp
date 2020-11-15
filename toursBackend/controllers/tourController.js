// const fs = require('fs');
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

const Tour = require('./../models/tourModel');
const async = require('async');
const APIFeatures = require('./../utils/apiFeatures');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
const cloudinary = require('cloudinary');

// ---------------- Add Post---------------- 

cloudinary.config({ 
   cloud_name: 'dnf8ntdmr', 
   api_key: '563934858817624', 
   api_secret: 'jdWteSWvkd_CUuf4Dd7GO3lFYUc' 
});
// ---------------- Find Job-list route sorting by date ---------------- 

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};
// exports.createTour =  catchAsync(async  (req, res) => {
//     console.log('mmm', startLocationArray);
//     const newTour = await Tour.create(req.body.data);
//     newTour.save();
//     console.log('with location', newTour);
//         res.status(201).json({
//             status: 'success',
//             data: {
//                 data: newTour
//             }
//         });
    
// });
exports.getAllTours = factory.getAll(Tour);
exports.getTour = factory.getOne(Tour , {path :'reviews'});
exports.createTour = factory.createOne(Tour);
exports.updateTour = factory.updateOne(Tour);
exports.deleteTour = factory.deleteOne(Tour);
exports.deleteAllTours = factory.deleteMany(Tour);

exports.getTourStats =catchAsync(async (req, res) => {
    const stats = await Tour.aggregate([
      
      {
        $match: { ratingsAverage: { $gte: 4.5 } }
      },
      {
        $group: {
          _id: { $toUpper: '$difficulty' },
          numTours: { $sum: 1 },
          numRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' }
        }
      },
      {
        $sort: { avgPrice: 1 }
      }
      // {
      //   $match: { _id: { $ne: 'EASY' } } //ne = not equal
      // }
    ]);
    res.status(200).json({
      status: 'success',
      data: {
        stats
      }
    });
  });
 exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1; // 2021
  const plan = await Tour.aggregate([
    {
      $unwind: '$startDates' // return first item of arrays
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`)
        }
      }
    },
    {
     $group:{
      _id:{ $month: '$startDates'},
      numTourStarts:{ $sum: 1},
      tours:{$push: '$name'}
     }
    },
    {
      $addFields:{month:'$_id'}
    },
    {
      $sort:{numTourStarts: -1}
    },
    {
      $limit:6
    }
  
  ]);
  console.log('plan',plan);
});


// /tours-within/:distance/center/:latlng/unit/:unit
// /tours-within/233/center/34.111745,-118.113491/unit/mi
// 
exports.getTourswithin  = catchAsync(async (req, res, next) => {
  const { distance, latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');

  const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1; // mi or killo

  if (!lat || !lng) {
    next(
      new AppError(
        'Please provide latitutr and longitude in the format lat,lng.',
        400
      )
    );
  }

  const tours = await Tour.find({
    startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
  });

  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      data: tours
    }
  });
});

// حساب المسافة من كل الرحلات ونقظة البداية
exports.getDistances = catchAsync(async (req, res, next) => {
  const { latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');

  const multiplier = unit === 'mi' ? 0.000621371 : 0.001;

  if (!lat || !lng) {
    next(
      new AppError(
        'Please provide latitutr and longitude in the format lat,lng.',
        400
      )
    );
  }

  const distances = await Tour.aggregate([ //geonear alwayes be the firist step
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [lng * 1, lat * 1]
        },
        distanceField: 'distance',
        distanceMultiplier: multiplier
      }
    },
    {
      $project: {
        distance: 1,
        name: 1
      }
    }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      data: distances
    }
  });
});

//Testtttt
exports.getTest = async (req, res) => {
  try {
    const myTours =await Tour.aggregate([
      {
        $match: { duration: { $gte: 7 } }
      },
      {
        $group : {
          _id:'$price',
          maxSize: { $max :'$maxGroupSize'},
          maxSizeGroupsNumber : { $sum : 1}
        }
      },
      {
        $addFields : {myGrropNumber : '$maxSizeGroupsNumber'}
      }
      
    ]);

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results:myTours.length,
      data: {
        myTours
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};
