var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

var index = require('./routes/index');
var recipesRouter = require('./routes/recipe');
var imageRouter = require('./routes/image');

var app = express();

////Import the mongoose module
const mongoose = require('mongoose');
const Recipe = require('./models/recipe')

////Set up default mongoose connection
const mongoDB = process.env.mongodb || 'mongodb://127.0.0.1:27017/testdb';
const conn = mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then((result) => {
    console.log('Mongoose default connection open to ' + mongoDB);
    // Check if 'recipes' collection is empty and seed the the database with default values
    mongoose.connection.db.collection('recipes').countDocuments({}).then((count) => {
      if (count < 1) {
        loadRecipes()
      }
    }).catch(err => {
      console.log(err)
    })
  })

  .catch(err => {
    console.log('Connection to database failed: ', err)
  })
var recipes = require('./data/default-data.json')
async function loadRecipes() {
  try {
    await Recipe.insertMany(recipes);
    console.log('Initialized new mongodb');
  } catch (e) {
    console.log(e);
  }
};


// populate mongoose with default recipes

////Get the default connection
//var db = mongoose.connection;

////Bind connection to error event (to get notification of connection errors)
//db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// This part is for middlewares
app.use(logger('dev'));
app.use(bodyParser.json())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}))



// for parsing multipart/form-data
app.use(upload.array());

app.use(express.static('public'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

// This part is for route registration

app.use('/', index);
app.use('/recipe', recipesRouter);
app.use('/image', imageRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = {
  conn,
  app
};