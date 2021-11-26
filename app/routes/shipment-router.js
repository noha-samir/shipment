var router = require('express').Router();
var ShipmentController = require('../controllers/Shipment-controller');
var ShipmentValidation = require('../validations/Shipment-validation');

/**
 * Router that passed the request to a validation middleware then to its controller.
 */

router.post('/', ShipmentValidation.validInputsForCreateShipment, ShipmentController.controllerCreateShipment);

module.exports = router;