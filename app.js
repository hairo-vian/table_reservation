const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const userApiRouter = require('./api/routes/user/user_route')
const restaurantApiRouter = require('./api/routes/restaurant/restaurant_route')
const tableApiRouter = require('./api/routes/meja/meja_route')
const reservationApiRouter = require('./api/routes/reservation/reservation_route')
const cors = require('cors');

const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public-flutter')));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const baseApiUrl = '/table_reservation/api';
app.use('/', indexRouter);
app.use(baseApiUrl + '/user', userApiRouter)
app.use(baseApiUrl + '/restaurant', restaurantApiRouter)
app.use(baseApiUrl + '/table', tableApiRouter)
app.use(baseApiUrl + '/reservation', reservationApiRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page & send back error json
    res.status(err.status || 500).json({
        status: err.status,
        message: err.message
    });
    res.render('error');
});

module.exports = app;