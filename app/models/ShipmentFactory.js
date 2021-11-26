const constants = require('../../helper/constants');
let Shipments = require('./BaseShipment');
/**
 * Design pattern : Factory Design Pattern.
 * Design pattern to select the target and build the required object.
 */
class Shipment_Factory {
    ServiceID = null;
    Package = null;
    createShipment(callback) {
        let returnedBaseShipment = null;
        if(constants.fedex.includes(this.ServiceID)){
            returnedBaseShipment = new Shipments.FedEx_Shipment(this.ServiceID,this.Package);
        }
        else if(constants.UPS.includes(this.ServiceID)){
            returnedBaseShipment = new Shipments.UPS_Shipment(this.ServiceID,this.Package);
        }
        callback(null,returnedBaseShipment);
    }
}

module.exports = Shipment_Factory;