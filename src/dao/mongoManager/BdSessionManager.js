const userModel = require('../models/users.model');

class BdSessionManager {
  getSession = async (email, password) => {
    return await userModel.findOne({ email, password });
  };

  getEmail = async (email) => {
    return await userModel.findOne(email);
  };

  createSession = async (user) => {
    const { firstName, lastName, email, password, role, cart } = user;
    return await userModel.create({ firstName, lastName, email, password, role, cart });
  };
  UserSession = async (id) => {
    return await userModel.findById(id);
  };

  updatePassword = (newPassword, id) => userModel.findByIdAndUpdate(id, { password: newPassword });

  UpdateRole = async (id, role) => userModel.findByIdAndUpdate(id, role);
}

module.exports = new BdSessionManager();