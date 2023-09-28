const userModel = require('../models/users.model');

class BdSessionManager {
  getSession = async (email, password) => {
    return await userModel.findOne({ email, password });
  };

  getEmail = async (email) => {
    return await userModel.findOne(email);
  };

  createSession = async (user) => {
    const { firstName, lastName, email, password, role, cart, last_connection, documents } = user;
    return await userModel.create({ firstName, lastName, email, password, role, cart, last_connection, documents });
  };
  UserSession = async (id) => {
    return await userModel.findById(id);
  };

  updatePassword = (newPassword, id) => userModel.findByIdAndUpdate(id, { password: newPassword });

  UpdateRole = async (id, role) => userModel.findByIdAndUpdate(id, { role: role });

  getOne = async (search) => {
    let result = userModel.findOne(search);
    return result;
  };

  editOne = async (email, user) => {
    let result = userModel.updateOne({ email }, user);
    return result;
  };
  editOneById = async (id, params) => {
    let result = userModel.findByIdAndUpdate(id, params);
    return result;
  };
}

module.exports = new BdSessionManager();