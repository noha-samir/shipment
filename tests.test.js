const request = require("supertest");
const app = require('./app');

/**
 * Main functionalities in our application run tests.
 *    - Test server connection.
 *    - Should return success & a successful object during testing the UPS shipment company IDs.
 *    - Should return success & a successful object during testing the fedex shipment company IDs
 *    - Should return validation error with diffrenet shipment ID.
 *    - Should return validation error with wrong package values.
 */

test(`Test server connection`, () => {
  expect(app).not.toEqual(null);
});

test(`Should return success & a successful object during testing the UPS shipment company IDs`, () => {
  const body = {
    ServiceID:"UPS2DAY",
    Package:{
        width: 10,
        height: 20,
        length: 30,
        weight: 40
    }
};
  return request(app)
    .post(`/api/v1/shipments`)
    .send(body)
    .expect(200)
    .then((response) => {
      expect(response.body).toStrictEqual({
        "message": "Success",
        "returnedObject": {
            "shipmentServiceID": "UPS2DAY",
            "package": {
                "width": 10,
                "height": 20,
                "length": 30,
                "weight": 40
            }
        }
    });
    });
});

test(`Should return success & a successful object during testing the fedex shipment company IDs`, () => {
  const body = {
    ServiceID:"fedexAIR",
    Package:{
        width: 10,
        height: 20,
        length: 30,
        weight: 40
    }
};
  return request(app)
    .post(`/api/v1/shipments`)
    .send(body)
    .expect(200)
    .then((response) => {
      expect(response.body).toStrictEqual({
        "message": "Success",
        "returnedObject": {
            "carrierServiceID": "fedexAIR",
            "packageDetails": {
                "width": 10,
                "height": 20,
                "length": 30,
                "weight": 40
            }
        }
    });
    });
});

test(`Should return validation error with diffrenet shipment ID`, () => {
  const body = {
    ServiceID:"fedex",
    Package:{
        width: 10,
        height: 20,
        length: 30,
        weight: 40
    }
};
  return request(app)
    .post(`/api/v1/shipments`)
    .send(body)
    .expect(400)
    .then((response) => {
      expect(response.body).toStrictEqual({
        "user-message": "Validation error: ServiceID should be one of fedexAIR,fedexGroud or UPSExpress,UPS2DAY!!!"
    });
    });
});

test(`Should return validation error with wrong package values`, () => {
  const body = {
    ServiceID:"fedexAIR",
    Package:{
        width: -10,
        height: 20,
        length: 30,
        weight: 40
    }
};
  return request(app)
    .post(`/api/v1/shipments`)
    .send(body)
    .expect(400)
    .then((response) => {
      expect(response.body).toStrictEqual({
        "user-message": "Validation error: Package width must be a positive number!!!"
    });
    });
});
