var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
var cors = require('cors')

var authRouter = require('./routes/auth');
var userRouter = require('./routes/user');
var itemRouter = require('./routes/item');
var indexRouter = require('./routes/movie');
var reviewRouter = require('./routes/review');
var verifyToken = require('./middleware/verifyToken')
require("dotenv").config();


var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors())
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/',(req, res) => {
  console.log(req.body)
});
app.use(express.static(path.join(__dirname, 'public')));

// All route
app.post('/',(req, res) => {
  console.log(req.body)
});
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/item',  itemRouter);
app.use('/movie', verifyToken, indexRouter);
app.use('/review',  reviewRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
