const mongoose = require('mongoose');

// select :false to any item hide it 

const busSchema = new mongoose.Schema({

    busNumber: {
        type: String,
        required: [true, 'A tour must have a bus number'],
        unique: true,
    },
    brand: {
        type: String,
        required: [true, 'A tour must have a brand']
    },
    maxPassengerSize: {
        type: Number,
        required: [true, 'A tour must have a passenger size']
    },
    size: {
        type: String,
        required: [true, 'A tour must have a size'],

    },
      color: {
        type: String,
        required: [true, 'A tour must have a color'],

    }

});



const Bus = mongoose.model('Bus', busSchema);

module.exports = Bus;