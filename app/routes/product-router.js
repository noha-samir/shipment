var router = require('express').Router();
var ProductController = require('../controllers/product-controller');
var ProductValidation = require('../validations/product-validation');

/**
 * Router that passed the request to a validation middleware then to its controller.
 */

router.get('/:state_id', ProductValidation.validInputsForGETProduct, ProductController.controllerListProductsByState);

router.put('/:next_state_id', ProductValidation.validProductModification, ProductController.controllerUpdateProductState);

module.exports = router;