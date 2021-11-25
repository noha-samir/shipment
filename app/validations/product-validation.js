const Joi = require('joi');

/**
 * Validation over all products APIs.
 */

// schema options
const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true // remove unknown props
};

// create schema object
const getProductSchema = Joi.object().keys({
    state_id: Joi.number().positive().error(new Error("state_id should be positive integer!!!")),
});

module.exports.validInputsForGETProduct = function (req, res, next) {
    // validate request params against schema
    const { error, value } = getProductSchema.validate(req.params, options);
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

// create schema object
const updateProductSchemaParams = Joi.object().keys({
    next_state_id: Joi.number().positive().error(new Error("next_state_id should be positive integer!!!"))
});

module.exports.validProductModification = function (req, res, next) {
    // validate request params against schema
    const { error, value } = updateProductSchemaParams.validate(req.params, options);
    if (error) {
        // on fail return comma separated errors
        let Err = new Error();
        Err.message = `Validation error: ${error.message}`;
        next(Err);
    }
    else {
        req.params = value;
        next();
    }
}