let Category = require('../models/Category');
let ConnectionSteps = require('../../helper/connection-steps');
/**
 * 
 * @param {*} req the coming request.
 * @param {*} res the response to be returned.
 * @param {*} next callback with the next execution.
 * 
 * Controller of list categories that takes the request variables and pass it to the model to work on it. 
 */
module.exports.controllerListCategories = function (req, res, next) {
    var aConnectionSteps = new ConnectionSteps();
/**
 * 
 * @param {*} req The coming request.
 * @param {*} res The response to be returned.
 * @param {*} next Callback with the next execution.
 * @returns {*} Error or arrOfCategories.
 * 
 * Controller of list categories that takes the request variables and pass it to the model to work on it. 
 */
    aConnectionSteps.controllerSteps(req, res, next, function (connection, callback) {
        let aCategory = new Category();
        let limit = req.query.limit;
        let offset = req.query.offset;
        if(req.query.parent_id == undefined){
            aCategory.parent_id = {"category_id":null};
        }else{
            aCategory.parent_id = {"category_id":req.query.parent_id};
        }
        /**
         * @param {*} connection A valid connection to database.
         * @param {*} limit Number of elements of single page.
         * @param {*} offset Number of the starting position to get data.
         * @returns error or arrOfCategories.
         * 
         * list categories function that communicate with te DB and has its own logic.
         */
        aCategory.listCategories(connection,limit,offset, function (err, arrOfCategories) {
            callback(err, arrOfCategories);
        });
    });
};