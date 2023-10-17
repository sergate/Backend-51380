const userModel = require('../models/users.model');
const UsersModel = require('../models/users.model');

class BdUserManager {
  get = () => UsersModel.find();

  insert = (user) => UsersModel.create(user);

  update = (user, id) => UsersModel.findByIdAndUpdate(id, user);

  delete = (id) => {
    return UsersModel.findByIdAndDelete(id);
  };

  lastConnection = async (user, lastconnection) => {
    user.last_connection = lastconnection;
    // let result = UsersModel.updateOne({ email: user.email }, user);
    let result = await UsersModel.findByIdAndUpdate(user._id, { last_connection: lastconnection });
    return result;
  };

  deleteLast = async (email) => {
    let result = await UsersModel.deleteOne({ email: email });
    return result;
  };
  deleteMany = async (users) => {
    let wentWrong = [];

    users.forEach(async (user) => {
      let result = await UsersModel.deleteOne({ email: user });
      console.log(result);
      if (!result.acknowledged) wentWrong.push(user);
    });

    return wentWrong;
  };
}

module.exports = new BdUserManager();