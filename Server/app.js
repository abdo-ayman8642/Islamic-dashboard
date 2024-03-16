var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const compression = require('compression')
const helmet = require("helmet");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const url = require('url');
const proxy = require('express-http-proxy');

var app = express();
app.use(compression())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.disable('x-powered-by')
app.use(helmet.hidePoweredBy({
  setTo:
    'Love and other drugs'
}));
// const authProxy = proxy('http://localhost:3001/learning/', {
//   proxyReqPathResolver: req => url.parse(req.originalUrl).path
// });



process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥 Process terminated!');
  });
})

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use("/", express.static(path.resolve(__dirname, "client/build")));

// app.use('/learning', authProxy);


app.get('/*', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
})

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

module.exports = app;
