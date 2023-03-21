const debug = require('debug')('projetpokedex:server');
const http = require('http');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('../routes/index');
const addRouter = require('../routes/add');
const deleteRouter = require('../routes/delete');
const detailsRouter = require('../routes/details');

function run() {
    const port = normalizePort(process.env.PORT || '3000');

    const app = express();

// view engine setup
    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'ejs');

    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, '../public')));

// Routes
    app.use('/', indexRouter);
    app.use('/add', addRouter);
    app.use('/delete', deleteRouter);
    app.use('/details', detailsRouter);

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

    app.listen(port, () => {
        console.log(`App listening on port ${port}`)
    })
}

module.exports = {run};


function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}