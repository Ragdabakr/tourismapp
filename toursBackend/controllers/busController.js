


const Bus = require('./../models/busModel');
const factory = require('./handlerFactory');
  

exports.getAllbuses = factory.getAll(Bus);
exports.getBus = factory.getOne(Bus);
exports.createBus= factory.createOne(Bus);
exports.updateBus = factory.updateOne(Bus);
exports.deleteBus = factory.deleteOne(Bus);





