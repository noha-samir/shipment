const request = require("supertest");
const app = require('./app');
const aDB = require('./database');

/**
 * Main functionalities in our application run tests.
 *    - Test server connection.
 *    - Test DataBase connection.
 *    - Should return all categories under this parent.
 *    - Should return all categories.
 *    - Should return all products with state_id.
 *    - should return the updated product with specific state_id else return error
 */

test(`Test server connection`, () => {
  expect(app).not.toEqual(null);
});

test(`Test DataBase connection`, () => {
  aDB.connectionWithTransaction(function(err,connection){
        expect(err).toBeNull();
        expect(connection).not.toEqual(null);
      });
});

test(`Should return all categories under this parent`, () => {
  return request(app)
    .get(`/api/v1/categories?parent_id=${1}`)
    .expect(200)
    .then((response) => {
      expect(response.body).toStrictEqual([
        { "category_id": 2, "category_name": "accessories", "parent_id": { "category_id": 1 } }
      ]);
    });
});

test(`Should return all categories`, () => {
  return request(app)
    .get(`/api/v1/categories`)
    .expect(200)
    .then((response) => {
      expect(response.body).toStrictEqual([
        { "category_id": 1, "category_name": "clothes", "parent_id": { "category_id": null } },
        { "category_id": 2, "category_name": "accessories", "parent_id": { "category_id": 1 } }]);
    });
});

const stateId = 2;
test(`Should return all products with state_id:${stateId}`, () => {
  return request(app)
    .get(`/api/v1/products/${stateId}`)
    .expect(200)
    .then((response) => {
      expect(response.body).toEqual(
        expect.arrayContaining([
          {
            "product_id": 2,
            "product_name": "dress",
            "product_price": 500,
            "product_parent": {
              "product_id": null
            },
            "category": {
              "category_id": 1,
              "category_name": "clothes",
              "category_parent": {
                "category_id": null
              }
            },
            "state": {
              "state_id": stateId,
              "state_name": "DeletedDraft"
            },
            "main_image": {
              "image_id": 1
            },
            "list_of_images": [
              {
                "image_id": 1
              }
            ]
          }
        ])
      );
    });
});


const nextStateId = 8;
const productId = 1;
test(`should return the updated product with this state_id: ${nextStateId} else return error`, () => {
  return request(app)
    .put(`/api/v1/products/${nextStateId}`)
    .send({
      product_id: productId
    })
    .then((response) => {
      if(response.status == 200) expect(response.body.state.state_id).toBe(nextStateId);
      else expect(response.status).toBe(400);
    });
});
