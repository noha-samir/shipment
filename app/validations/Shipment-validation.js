const Joi = require('joi');
const constants = require('../../helper/constants')
/**
 * Validation over all shipments APIs.
 */

// schema options
const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true // remove unknown props
};

const shipmentTypes = constants.fedex.concat(constants.UPS);

// create schema object
const getShipmentSchema = Joi.object().keys({
    ServiceID: Joi.any().valid(...shipmentTypes).error(new Error(`ServiceID should be one of ${constants.fedex} or ${constants.UPS}!!!`)),
    Package: Joi.object().keys({
        width: Joi.number().positive().required().error(new Error("Package width must be a positive number!!!")),
        height: Joi.number().positive().required().error(new Error("Package height must be a positive number!!!")),
        length: Joi.number().positive().required().error(new Error("Package length must be a positive number!!!")),
        weight: Joi.number().positive().required().error(new Error("Package weight must be a positive number!!!"))
    })
});

module.exports.validInputsForCreateShipment = function (req, res, next) {
    // validate request body against schema
    const { error, value } = getShipmentSchema.validate(req.body, options);
    if (error) {
        // on fail return comma separated errors
        let Err = new Error();
        Err.message = `Validation error: ${error.message}`;
        next(Err);
    } else {
        // on success replace req.params with validated value and trigger next middleware function
        req.params = value;
        next();
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
