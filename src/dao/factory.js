const { percistence } = require('../config/config');

const dao = {};

switch (percistence) {
  case 'FS':
    dao.manager = require('./fsManager/ProductManager');
  case 'MONGO':
    dao.manager = require('./mongoManager/BdProductManager');
  default:
    dao.manager = require('./mongoManager/BdProductManager');
}

module.exports = dao;