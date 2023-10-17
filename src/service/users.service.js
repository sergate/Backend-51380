// const userModel = require('../dao/models/users.model');

// const getUser = (email) => userModel.find(email);

// module.exports = {
//   getUser,
// };
const userModel = require('../dao/models/users.model');

class UserService {
  constructor(dao) {
    this.dao = dao;
  }

  getUser(email, firstName, role) {
    return userModel.find(email, firstName, role);
  }

  // getUser =() => this.dao.get()

  insertUser(user) {
    return this.dao.insert(user);
  }

  updateUser(user, id) {
    return this.dao.update(user, id);
  }

  delete(id) {
    return this.dao.delete(id);
  }

  deleteLast(last_connection) {
    return this.dao.deleteLast(last_connection);
  }
}

module.exports = UserService;