var Product = require('../models/Product');
var ConnectionSteps = require('../../helper/connection-steps');

/**
 * 
 * @param {*} req The coming request.
 * @param {*} res The response to be returned.
 * @param {*} next Callback with the next execution.
 * @returns {*} Error or arrOfProducts.
 * 
 */

module.exports.controllerListProductsByState = function (req, res, next) {
    var aConnectionSteps = new ConnectionSteps();
    aConnectionSteps.controllerSteps(req, res, next, function (connection, callback) {
        let aProduct = new Product();
        let limit = req.query.limit;
        let offset = req.query.offset;
        aProduct.state = {'state_id':req.params.state_id};
        /**
         * @param {*} connection A valid connection to database.
         * @param {*} limit Number of elements of single page.
         * @param {*} offset Number of the starting position to get data.
         * @returns error or arrOfCategories.
         * 
         * list products function that communicate with te DB and has its own logic.
         */
        aProduct.listProducts(connection,limit,offset, function (err, arrOfProducts) {
            callback(err, arrOfProducts);
        });
    });
};

module.exports.controllerUpdateProductState = function (req, res, next) {
    var aConnectionSteps = new ConnectionSteps();
    aConnectionSteps.controllerSteps(req, res, next, function (connection, callback) {
        let aProduct = new Product();
        let nextStateId = req.params.next_state_id;
        aProduct.product_id = req.body.product_id;
        aProduct.updateProductState(connection, nextStateId, function (err, updatedProduct) {
            callback(err, updatedProduct);
        });
    });
};