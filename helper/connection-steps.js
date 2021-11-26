var async = require('async');

function Helper() {
}

/**
 * 
 * @param {*} req the coming request.
 * @param {*} res the response to be returned.
 * @param {*} next callback with the next execution.
 * @returns {*} respond to the user.
 * 
 * This is a helper function that opens a connection and do the logic of our code then
 * release the response to the user.
 * */

Helper.prototype.controllerSteps = function (req, res, next, UserAction) {
    async.waterfall([
        //Do some logic
        function (callback) {
            UserAction(function (err, returnedObject) {
                callback(err, returnedObject);
            });
        }
    ],
        //response with our output.
        function (err, output) {
            if (err) {
                next(err);
            }
            else {
                const returnedTarget = Object.assign({message: 'Success'}, output);
                res.status(200).json(returnedTarget);
            }
        }
    );
};

module.exports = Helper;