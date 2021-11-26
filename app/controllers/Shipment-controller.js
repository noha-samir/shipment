var ShipmentFactory = require('../models/ShipmentFactory');
var ConnectionSteps = require('../../helper/connection-steps');

/**
 * 
 * @param {*} req The coming request.
 * @param {*} res The response to be returned.
 * @param {*} next Callback with the next execution.
 * @returns {*} Error or success shipment sent.
 * 
 */

module.exports.controllerCreateShipment = function (req, res, next) {
    var aConnectionSteps = new ConnectionSteps();
    aConnectionSteps.controllerSteps(req, res, next, function (callback) {
        let aShipmentFactory = new ShipmentFactory();
        aShipmentFactory.ServiceID = req.body.ServiceID;
        aShipmentFactory.Package = req.body.Package;
        /**
         * 
         * @returns error or returnedObject.
         * 
         * create Shipment function that communicate with the services.
         */
        aShipmentFactory.createShipment(function (err, returnedObject) {
            callback(err, returnedObject);
        });
    });
};