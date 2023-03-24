const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');

/* Routers */
const indexRouter = require('../routes/index');
const addRouter = require('../routes/add');
const deleteRouter = require('../routes/delete');
const detailsRouter = require('../routes/edit');

/* Functions */
function run() {
    const port = process.env.PORT || '3000'; // Port can be set in the environment variable PORT

    const app = express();

    // view engine setup
    app.set('view engine', 'ejs');

    // Set the views directory
    app.set('views', path.join(__dirname, '../views'));

    // Set the public directory
    app.use(express.static(path.join(__dirname, '../public')));

    // Set the middleware
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));

    // Routes
    app.use('/', indexRouter);
    app.use('/add', addRouter);
    app.use('/delete', deleteRouter);
    app.use('/edit', detailsRouter);

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

    // Start the server
    app.listen(port, () => {
        console.log(`App listening on port ${port}`)
    })
}

// Export the run function
module.exports = {
    run
};