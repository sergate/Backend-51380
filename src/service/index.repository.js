const dao = require('../dao/factory');
const ProductService = require('./products.service');

const ProductRepository = new ProductService(dao);

module.exports = {
  ProductRepository,
};