const userModel = require('../models/users.model');

class BdSessionManager {
  getSession = async (email, password) => {
    return await userModel.findOne({ email, password });
  };

  getEmail = async (email) => {
    return await userModel.findOne(email);
  };

  createSession = async (user) => {
    console.log(user);
    const { firstName, lastName, email, password, rol, cart } = user;
    return await userModel.create({ firstName, lastName, email, password, rol, cart });
  };
  UserSession = async (id) => {
    console.log(id);
    return await userModel.findById(id);
  };
}

module.exports = new BdSessionManager();
