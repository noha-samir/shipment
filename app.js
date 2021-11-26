var app = require('express')();
var compression = require("compression");
var bodyParser = require('body-parser');
var morgan = require('morgan');
require('dotenv').config();
app.use(morgan('dev'));
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/**
 * This a file app to handling the routers if it is acceptable URL or not exist.
 * Rout us to the main routers.
 */

app.use('/api', require('./routes-index'));

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

/**
 * Handling DB issues.
 */

app.use((error, req, res, next) => {
    res.status(error.status || 400);
    res.json({
        "custom-error-code": error.code,
        "developer-message":error.developerMessage,
        "user-message": error.message,
        "additional-data": error.additionalData
    });
});

module.exports = app;