var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongodb = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var session = require('express-session');
var sockets = require('socket.io');

var db = mongoose.connection;

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// Sockets IO
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
server.listen(process.env.PORT || 3589);
console.log('Sockets IO server listening');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to Mongo
mongodb.connect('mongodb://localhost:27017/song', function(err, db) {
  if (err) {
    throw err;
  }
  db.collection('song').find().toArray(function(err, result) {
    if (err) {
      throw err;
    }
    console.log(result);
  });
});

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Connect to SocketIO


// error handlers

// Handle Posts from Adding of Song Fragments
app.post('/song/add', function(req, res, next)
{
  console.log('Woo got the form working');
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(3000, function() {
	console.log('Server Started!!')
});


module.exports = app;
