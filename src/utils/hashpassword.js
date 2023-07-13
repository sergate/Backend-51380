const bcrypt = require('bcrypt');

const hashpassword = async (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(12));

const comparePassword = async (password, hash) => bcrypt.compareSync(password, hash);

module.exports = {
  hashpassword,
  comparePassword,
};
