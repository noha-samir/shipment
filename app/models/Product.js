let async = require('async');
let dict = require("dict");
let FactoryState = require('./FactoryState');

class Product {

    product_id = null;
    product_name = null;
    product_price = null;
    product_parent = null;
    category = null;
    state = null;
    main_image = null;
    list_of_images = null;

    /**
     * 
     * @param {Error} err Passed Error if we get an error during commenicating with the DB.
     * @param {Array} results Array of returned records from database.
     * @param {*} callback Array of products objects.
     * 
     */
    mapProduct(err,results,callback) {
        let arrOfProducts = [];
                let listOfProducts = dict({});
                async.eachSeries(results, function (element, nextCallback) {
                    if (!err) {
                        let tmpProduct = new Product();
                        let mainImgObj = {
                            'image_id': element.main_image_id
                        }
                        if (element.main_image_id == element.product_image_id) {
                            mainImgObj = {
                                'image_id': element.product_image_id,
                                'image_url': element.product_image_url,
                                'product': {
                                    "product_id": element.product_image_product_id
                                }
                            }
                        }
                        if (listOfProducts.has((element.main_product_id).toString())) {
                            let valDict = listOfProducts.get((element.main_product_id).toString());
                            let nextImgObj = {
                                'image_id': element.product_image_id,
                                'image_url': element.product_image_url,
                                'product': {
                                    "product_id": element.product_image_product_id
                                }
                            }
                            valDict.list_of_images.push(nextImgObj);
                            listOfProducts.set((element.main_product_id).toString(), valDict);
                        }
                        else {
                            tmpProduct.product_id = element.main_product_id;
                            tmpProduct.product_name = element.main_product_name;
                            tmpProduct.product_price = element.main_product_price;
                            tmpProduct.product_parent = { 'product_id': element.main_product_parent_id };
                            let catObj = {
                                'category_id': element.main_product_category_id,
                                'category_name': element.main_product_category_name,
                                'category_parent': {
                                    "category_id": element.category_parent_id
                                }
                            }
                            tmpProduct.category = catObj;//new Category(catObj);
                            let stateObj = {
                                'state_id': element.main_product_state_id,
                                'state_name': element.main_product_state_name
                            }
                            tmpProduct.state = stateObj;//new Base_State(stateObj);
                            tmpProduct.main_image = mainImgObj;//new Main_Image(ImgObj);
                            tmpProduct.list_of_images = [mainImgObj];
                            listOfProducts.set((element.main_product_id).toString(), tmpProduct);
                        }
                        nextCallback(null);
                    }
                    else {
                        nextCallback(err);
                    }
                }, function (err) {
                    listOfProducts.forEach(function (mainValue, mainKey) {
                        arrOfProducts.push(mainValue);
                    });
                    callback(err, arrOfProducts);
                });
    }
    
    /**
     * 
     * @param {*} gConnection The connection to database.
     * @param {*} limit Number of elements of single page.
     * @param {*} offset Number of the starting position to get data.
     * @param {*} callback Callback with error or array of products.
     */

    listProducts(gConnection, limit, offset, callback) {
        let self = this;
        let pagenation = '';
        if (limit != undefined && offset != undefined) {
            pagenation = `LIMIT ${limit} OFFSET ${offset}`;
        }
        var preparedSqlQuery = `
        SELECT  product.product_id as main_product_id , product.product_name as main_product_name , 
                product.product_price as main_product_price , product.parent_id as main_product_parent_id ,
                state.state_id as main_product_state_id ,state.state_name as main_product_state_name, 
                category.category_id as main_product_category_id , category.category_name as main_product_category_name, 
                category.parent_id as category_parent_id, product.main_image_id as main_image_id,
                image.image_id as product_image_id,
                image.image_url as product_image_url, image.product_id as product_image_product_id
                FROM  product 
                INNER JOIN category ON product.category_id = category.category_id 
                INNER JOIN state ON product.state_id = state.state_id 
                LEFT JOIN image ON product.product_id = image.product_id
                WHERE product.state_id = ${self.state.state_id} 
                ${pagenation}`;

        gConnection.query(preparedSqlQuery, function (err, results, fields) {
            if (!err && results) {
                self.mapProduct(err,results,function(err, arrOfProducts){
                    callback(err, arrOfProducts);
                });
            }
            else {
                callback(err);
            }
        });
    }

    /**
     * 
     * @param {*} gConnection The connection to database.
     * @param {*} product_id Selected product ID.
     * @param {*} nextStateId The new state of product.
     * @param {*} finallCallback return updated product.
     * Change state of product then return that product.
     */
    transferState(gConnection, product_id, nextStateId, finallCallback) {
        let self = this;
        async.waterfall([
            //update product state
            function (callback) {
                var preparedSqlQuery = `UPDATE product SET state_id = ${nextStateId} WHERE (product_id = ${product_id});`
                gConnection.query(preparedSqlQuery, function (err, results, fields) {
                    if (err) {
                        callback(err);
                    } else {
                        if (results.affectedRows == 0) {
                            let Err = new Error();
                            Err.message = "No updated records!!!";
                            callback(Err);
                        } else {
                            callback(null);
                        }
                    }
                });
            },
            //get updated product
            function (callback) {
                self.getProduct(gConnection, self.product_id, function (err, updatedProduct) {
                    callback(err, updatedProduct);
                });
            }
        ], function (err, updatedProduct) {
            finallCallback(err, updatedProduct)
        });
    }

    /**
     * 
     * @param {*} gConnection The connection to database.
     * @param {*} product_id Selected product ID.
     * @param {*} callback Callback with error or the selected product
     */
    getProduct(gConnection, product_id, callback) {
        let self = this;
        var preparedSqlQuery = `
        SELECT  product.product_id as main_product_id , product.product_name as main_product_name , 
                product.product_price as main_product_price , product.parent_id as main_product_parent_id ,
                state.state_id as main_product_state_id ,state.state_name as main_product_state_name, 
                category.category_id as main_product_category_id , category.category_name as main_product_category_name, 
                category.parent_id as category_parent_id, product.main_image_id as main_image_id,
                image.image_id as product_image_id,
                image.image_url as product_image_url, image.product_id as product_image_product_id
                FROM  product 
                INNER JOIN category ON product.category_id = category.category_id 
                INNER JOIN state ON product.state_id = state.state_id 
                LEFT JOIN image ON product.product_id = image.product_id
                WHERE product.product_id = ${product_id}
                ORDER BY main_product_id asc `;

        gConnection.query(preparedSqlQuery, function (err, results, fields) {
            if (!err && results) {
                self.mapProduct(err,results,function(err, arrOfProducts){
                    callback(err, arrOfProducts[0]);
                });
            }
            else {
                callback(err);
            }
        });
    }

    /**
     * 
     * @param {*} gConnection The connection to database.
     * @param {*} nextStateId The new state of product.
     * @param {*} finallCallback return updated product.
     */
    updateProductState(gConnection, nextStateId, finallCallback) {
        let self = this;
        async.waterfall([
            //get current Product
            function (callback) {
                self.getProduct(gConnection, self.product_id, function (err, currentProduct) {
                    callback(err, currentProduct)
                });
            },
            //create current state
            function (currentProduct, callback) {
                let aFactoryState = new FactoryState();
                aFactoryState.createState(currentProduct.state.state_id, function (err, baseState) {
                    callback(err, baseState);
                });
            },
            //is valid next state
            function (baseState, callback) {
                baseState.isValidNextState(nextStateId, function (err, isValid) {
                    if (err) {
                        callback(err);
                    } else {
                        if (isValid) {
                            callback(null);
                        } else {
                            let Err = new Error();
                            Err.message = "Invalid next state!!!";
                            callback(Err);
                        }
                    }
                });
            },
            //transfer state
            function (callback) {
                self.transferState(gConnection, self.product_id, nextStateId, function (err, updatedProduct) {
                    callback(err, updatedProduct);
                });
            }
        ], function (err, updatedProduct) {
            finallCallback(err, updatedProduct);
        });
    }
}

module.exports = Product;