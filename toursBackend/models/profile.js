
const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const profileSchema = new mongoose.Schema({
    about: {
        type: String,
        required: [true, 'Please provide your phone number'],
    },
    birthday: Date,
    gender: {
        type: String,
        enum: ['male', 'female'],
        default: 'male',
    },
    birthplace: String,
    Age: {
        type: Number,
        required: [true, 'Please provide your age'],
    },
    livesin: String,
    phonecode: {
        type: Number,
        required: [true, 'Please provide your phone number'],
    },
    phoneNumber: {
        type: Number,
        required: [true, 'Please provide your phone number'],
    },
    occupation: {
        type: String,
        required: [true, 'Please provide your occupation'],
    },
    skills: [{
        skillName: String
    }],
    languages: [{
        lang: String
    }],
    photo: String,
    profileCompleated: {
        type: Boolean,
        default: 'false',
    },

});





const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;