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

  getUser = (email, firstName, role) => userModel.find(email, firstName, role);

  // getUser =() => this.dao.get()

  insertUser = (user) => this.dao.insert(user);

  updateUser = (user, id) => this.dao.update(user, id);

  delete = (id) => this.dao.delete(id);

  deleteLast = (last_connection) => this.dao.deleteLast(last_connection);
}

module.exports = UserService;