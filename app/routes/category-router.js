var router = require('express').Router();
var CategoryController = require('../controllers/category-controller');
var CategoryValidation = require('../validations/category-validation');
/**
 * Router that passed the request to a validation middleware then to its controller.
 */
router.get('/', CategoryValidation.validInputsForListCategory, CategoryController.controllerListCategories);

module.exports = router;