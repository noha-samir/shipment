const Joi = require('joi');
/**
 * Validation over all categories APIs.
 */
// schema options
const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true // remove unknown props
};

// create schema object
const getCategorySchema = Joi.object().keys({
    parent_id: Joi.number().positive().error(new Error("parent_id should be positive integer!!!"))
});

module.exports.validInputsForListCategory = function (req, res, next) {
    // validate request params against schema
    const { error, value } = getCategorySchema.validate(req.params, options);
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