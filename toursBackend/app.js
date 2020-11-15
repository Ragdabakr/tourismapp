const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = express();
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const AppError = require('./utils/appError');
const cors = require('cors');


const globalErrorHandler = require('./controllers/errorController');

//Secure backages
const rateLimit = require('express-rate-limit'); 
const helmet = require('helmet'); 
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');




// 1) MIDDLEWARES
// Set security HTTP headers
app.use(helmet());
app.use(express.json());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}else {
  
}

// Body parser, reading data from body into req.body
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});
// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price'
    ]
  })
);


//connet to db
mongoose
.connect('mongodb+srv://cluster0-nnsu5.mongodb.net/test?retryWrites=true&w=majority', {
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
.then(() => {
  console.log('Mongodb connected....');
})
.catch(err => console.log(err.message));

mongoose.connection.on('connected', () => {
console.log('Mongoose connected to db...');
});

mongoose.connection.on('error', err => {
console.log(err.message);
});

mongoose.connection.on('disconnected', () => {
console.log('Mongoose connection is disconnected...');
});

// 3) ROUTES
// app.use('/api/v1/tours', require('./routes/tours'));
const reviewRouter = require('./routes/reviewRoutes');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const lookupRouter = require('./routes/lookup');
const imageRouter = require('./routes/imageRoutes');
const busRouter = require('./routes/busRoutes');
const hotelRouter = require('./routes/hotelRoutes');

app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/lookups', lookupRouter);
app.use('/api/v1/image', imageRouter);
app.use('/api/v1/buses', busRouter);
app.use('/api/v1/hotels', hotelRouter);

app.all('*',(req, res, next) => {
  // res.status(404).json({
  //   status:'fail',
  //   message: `Cant find ${req.originalUrl} on the server`
  // });
  next (new AppError( `Cant find ${req.originalUrl} on the server`, 404));
});
app.use(globalErrorHandler); // error middleware


module.exports = app;