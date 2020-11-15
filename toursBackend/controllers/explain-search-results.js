
exports.getAllTours = async (req, res) => {
try{
//query filter  
const queryObj ={ ...req.query };
const excludedFields = ['page' ,'sort' ,'limit' ,'fields'];
excludedFields.forEach(el => delete queryObj[el]);

// 2) Advanced filter 
// http://localhost:3000/api/v1/tours?duration[gte]=7&maxGroupSize=15&price[lte]=1500 // Api Example 
let queryStr = JSON.stringify(queryObj);
queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
// console.log('bbbb',JSON.parse(queryStr));
let allTours =  Tour.find(JSON.parse(queryStr));


// 3)Sorting
// the same value will sorting another value
// http://localhost:3000/api/v1/tours?sort=price,-ratingsAverage  // Api Example
    if(req.query.sort){
      const sortBy = req.query.sort.split(',').join(' ');
      allTours = allTours.sort(sortBy);
    }else{
      allTours = allTours.sort('-createdAt');
    }


// 4)Limiting
// http://localhost:3000/api/v1/tours?fields=name,duration,price   // Api Example
    if(req.query.fields){
      const limitBy = req.query.fields.split(',').join(' ');
      allTours = allTours.select(limitBy);
    }else{
      allTours = allTours.select('-__v'); // (-)return all fields exept v
    }


//5)Pagination
//http://localhost:3000/api/v1/tours?page=1&limit=4 // Api Example
const page = req.query.page *1 || 1;
const limit = req.query.limit *1 || 100;
const skip = (page -1) * limit;
console.log(page , limit , skip);
allTours = allTours.skip(skip).limit(limit);

if(req.query.page){
  const numTours = await Tour.countDocuments;
  if(skip >= numTours) throw new Error('this page not found');
}

const tours = await allTours;
  res.status(200).json({
    status: 'success',
    // results: tours.length,
    data: {
      tours
       }    
    });
  } catch(err){
      console.log(err);
      res.status(400).json({
        status: 'fail',
        message: err
      });
    }
};
