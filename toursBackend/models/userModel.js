
const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
 
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user'
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },
    passwordConfirmation: {
    type: String,
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function(el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!'
    }
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false
    },
    profile: {
        about: String,
        birthday: {
            year: String,
            month:String,
            day: String,
        },
        gender: {
            type: String,
            enum: ['male', 'female'],
            default: 'male',
        },
        birthplace: String,
        livesin: String,
        phoneCode: {
            type: Number,
            //required: [true, 'Please provide your phone code'],
        },
        phoneNumber: {
            type: Number,
           // required: [true, 'Please provide your phone number'],
        },
        occupation: {
            type: String,
          //  required: [true, 'Please provide your occupation'],
        },
        skills: [],
        languages: [],
        profileImage: {
            imageVersion: { type: String, default: '1585916456' },
            imageId: { type: String, default: 'user_rygoeq.png' }
        },
        profileCompleated: {
            type: Boolean,
            default: 'false',
        },
    }
    

});


userSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'user',
});

userSchema.pre('save', async function(next) {
//   // Only run this function if password was actually modified
//   //اذا لم يتم التعديل علي كلمة المرور 
  if (!this.isModified('password')) return next();
// Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  // Delete passwordConfirm field to not store in db
    this.passwordConfirmation = undefined;
  next();
});

//reset new password 
userSchema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000; // 
  next();
});

userSchema.pre(/^find/, function(next) {
//   this.find({ active: { $ne: false } });
this.find({ active:true });
  next();
});

userSchema.methods.correctPassword = async function(
  candidatePassword, //password enterd in body
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  // False means NOT changed
  return false;
};

userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex'); // create random token to send to email 
   // shouid encrypt resetToken after save it in db to prevent hakers from access it
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  //we nead send resetToken , passwordResetToken only for encrypt and save in db
  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;