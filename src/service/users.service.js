const userModel = require('../dao/models/users.model');

const getUser = (email) => userModel.find(email);

module.exports = {
  getUser,
};