const mongoose = require('mongoose');

// select :false to any item hide it 

const hotelSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'A hotel must have a number'],
        unique: true,
    },
    phone: {
        type: Number,
        required: [true, 'A hotel must have a phone']
    },
    city: {
        type: String,
        required: [true, 'A hotel must have a cuty']
    },
    address: {
        type: String,
        required: [true, 'A hotel must have an address'],

    }

});



const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;