var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require("./resources/logger");
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var edfRouter = require('./routes/edfservices');
var fmcRouter = require('./routes/fmcservices');

var app = express();
// Initialize Monk for establishing connection with MongoDB
var monk = require('monk');
var dbConfig = require('./resources/dbconfig');
var edfDB = monk(dbConfig.mongod_db.conn_str);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /client
//app.use(favicon(path.join(__dirname, '../client', 'favicon.ico')));
//app.use(logger('dev'));
app.use(require("morgan")("combined", { "stream": logger.stream }));
logger.debug("Using morgan winston logger");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client')));

// Make our db accessible to our router & set userId to be displayed in nav bar
app.use(function (req, res, next) {
  // Disable caching for content files
  res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  res.header("Pragma", "no-cache");
  res.header("Expires", 0);
  req.edfDB = edfDB;
  next();
});

app.use('/', indexRouter);
app.use('/edf', edfRouter);
app.use('/fmc', fmcRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
