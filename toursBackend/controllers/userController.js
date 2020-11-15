const User = require('./../models/userModel');
const async = require('async');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');


const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateMe = catchAsync(async(req, res) => {
 if(req.body.password || req.body.confirmPassword){
  return next(new AppError('This route is not for password update .. / Please user update my password!', 400));
 }
     // 2) Filtered out unwanted fields names that are not allowed to be updated
    const filteredBody = filterObj(req.body, 'name', 'email');
    const user = await User.findByIdAndUpdate(req.user.id, filteredBody, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  });

  exports.getMe = (req, res , next) => {
    req.params.id = req.user.id;
    next();
  }; 
  exports.deleteMe = catchAsync(async(req, res) => {
       const user = await User.findByIdAndUpdate(req.user.id ,{active : false});
       res.status(204).json({
         status: 'success',
         data:null
       });
  });  



exports.createUserProfile = catchAsync(async (req, res) => {

    const skills = req.body.credentials.skills// array of skillName
    const resultSkills = skills.map(({ value }) => value);
    
    const languages = req.body.credentials.languages// array of languageName
    const resultLanguages = languages.map(({ value }) => value);

    const foundUser = req.user;

    foundUser.profile.birthday = req.body.credentials.birthday;
    foundUser.profile.gender = req.body.credentials.gender;
    foundUser.profile.birthplace = req.body.credentials.birthplace;
    foundUser.profile.livesin = req.body.credentials.livesin;
    foundUser.profile.phoneCode = req.body.credentials.phoneCode;
    foundUser.profile.phoneNumber = req.body.credentials.phoneNumber;
    foundUser.profile.occupation = req.body.credentials.occupation;
    foundUser.profile.profileCompleated = true;
    foundUser.profile.about = req.body.credentials.about;

    //push array in to array
    await foundUser.profile.skills.push(...resultSkills);
    await foundUser.profile.languages.push(...resultLanguages);
    foundUser.save();

    console.log('foundUser', foundUser);
    res.status(204).json({
        status: 'success',
        data: foundUser
    });
});

  //exports.createUserProfile = factory.updateOne(User);
  exports.getAllUsers = factory.getAll(User);
  exports.createUser = factory.createOne(User);
  exports.getUser = factory.getOne(User);
  exports.updateUser = factory.updateOne(User); //update all data except password
  exports.deleteUser = factory.deleteOne(User);
  exports.deleteAllUsers = factory.deleteMany(User);
