const userModel = require('../dao/models/users.model');

const getUser = () => userModel.find();

module.exports = {
  getUser,
};