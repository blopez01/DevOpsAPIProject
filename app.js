var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');
var cors = require('cors');
require('dotenv').config()

//define paths to each route
var helloRouter = require('./routes/hello');
var propertyRouter = require('./routes/propertyservice');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

//each of these use function calls route to their own separate .js files in the ./routes folder
app.use('/hello', helloRouter);
app.use('/properties', propertyRouter.router);

//endpoint for swagger.json documentation
//fs simply reads the contents of the file and prints raw json to the page
app.get('/swagger.json', function (req, res, next) {
  fs.readFile("./resources/swagger.json", function(err, buf) {
    res.send(buf.toString());
    res.status(200);
  });
});

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
