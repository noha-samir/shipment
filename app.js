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

    if (error.sqlMessage) {
        
        error.status = 400;
        error.code = "DATABASE_ERROR";
        error.developerMessage = " state " + error.sqlState + " errno " + error.errno + " msg " + error.sqlMessage;
        error.message = "Something went wrong..";

    }else if(error.code == "EBUSY"){
        error.message = "Server is busy during hashing(renaming) the file , Please try again...";
    }else if(error.code == "EPERM"){
        error.message = "This operation is not permitted yet , Please try again...";
    }

    res.status(error.status || 400);
    res.json({
        "custom-error-code": error.code,
        "developer-message":error.developerMessage,
        "user-message": error.message,
        "additional-data": error.additionalData
    });
});

module.exports = app;