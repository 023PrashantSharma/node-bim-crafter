var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require("express-session");
/* const formidable = require('express-formidable'); */
var logger = require('morgan');
const cors = require('cors');
//global.localStorage = require('node-localstorage')

require('dotenv').config({ path: path.join(__dirname, '.env') });
admin = process.env.ADMIN_URL

global.bcrypt = require('bcryptjs');

var mongoose = require('mongoose');
mongoose.set('bufferCommands', false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("Mongodb Connected...")
  } catch (err) {
    console.log(err)
  }
}
connectDB();

var app = express();
var corsOptions = {
  origin: 'http://35.154.144.173/',
  optionsSuccessStatus: 200,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
}
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));

const oneDay = 1000 * 60 * 60 * 24;
app.use(
  session({
    key: "user_sid",
    secret: "somerandonstuffs",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: oneDay },
  })
);

const routes = require('./routes');
var adminRouter = require('./routes/admin');

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(require('./utils/response/responseHandler'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);
app.use(admin, adminRouter);

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
