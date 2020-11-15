const async = require('async');
const APIFeatures = require('./../utils/apiFeatures');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

exports.createOne = Model => catchAsync(async (req, res) => {
    console.log('newData',req.body.data);
    const newDocument = await Model.create(req.body.data);
    console.log('new', newDocument);
    console.log('lisinnn');

  res.status(201).json({
   status: 'success',
   data: {
    data: newDocument
    }
   });   
 });

exports.deleteOne = Model => catchAsync( async (req, res ,next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    console.log('deleteddoc', doc);
    if(!doc){
      return next(new AppError ('no document found with this id', 404));
    }
       res.status(204).json({
         status: 'success',
         data: null
       });
     });

exports.updateOne = Model => catchAsync(async (req, res) => {
    console.log('Edit data',req.body.data);
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body.data, {
        new: true,
        runValidators: true
      });
    console.log('editData', doc);
      if(!doc){
        return next(new AppError ('no document found with this id', 404));
      }
      res.status(200).json({
        status: 'success',
        data: {
          data : doc
        }
      });
    });

    exports.getOne = ( Model , popOptions) => catchAsync(async (req, res ,next) => {
      let query = Model.findById(req.params.id);
      if(popOptions) query = query.populate(popOptions);
      const doc = await query;

      if(!doc){
        return next(new AppError ('no document found with this id', 404));
      }

      res.status(200).json({
        status: 'success',
        data: {
          doc
        }
      });
    });

   exports.getAll = Model => catchAsync(async (req, res) => {
     // For get reviews
    let filter = {};
    if(req.params.tourId) filter = {tour : req.params.tourId};

    // EXECUTE QUERY
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const docs = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: docs.length,
      data: {
        docs
      }
    });
});

exports.deleteMany = Model => async (req, res) => {
  await Model.deleteMany();    
 res.status(204).json({
   status: 'success',
   data: null
 });
};