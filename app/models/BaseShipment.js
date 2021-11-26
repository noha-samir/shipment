const constants = require('../../helper/constants');

class Base_Shipment {
    returnedObject = null;
}

class FedEx_Shipment extends Base_Shipment {
    constructor(ServiceID,Package) {
        super();
        this.returnedObject = {
            carrierServiceID: ServiceID,
            packageDetails: {
                width: Package.width,
                height: Package.height,
                length: Package.length,
                weight: Package.weight
            }
        }
	} 
}

class UPS_Shipment extends Base_Shipment {
    constructor(ServiceID,Package) {
		super();
        this.returnedObject = {
            shipmentServiceID: ServiceID,
            package: {
                width: Package.width,
                height: Package.height,
                length: Package.length,
                weight: Package.weight
            }
        }
	} 
}

module.exports = {
    FedEx_Shipment : FedEx_Shipment, 
    UPS_Shipment: UPS_Shipment
}