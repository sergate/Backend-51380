const dao = require('../dao/factory');
const ProductService = require('./products.service');
const BdUsersManager = require('../dao/mongoManager/BdUsersManager');
const UserService = require('./users.service');
const ProductRepository = new ProductService(dao);
const userService = new UserService(BdUsersManager);
module.exports = {
  ProductRepository,
  userService,
};