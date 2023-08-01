const BdProductManager = require('../dao/mongoManager/BdProductManager');
const ProductService = require('./products.service');

const ProductRepository = new ProductService(BdProductManager);

module.exports = {
  ProductRepository,
};