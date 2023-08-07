//cokies

const DTOsUser = require('../dao/DTOs/user.dto');

const sessionLogin = async (req, res) => {
  res.send(req.user);
};

const loginRegister = async (req, res) => {
  const dtoUser = DTOsUser(req.user);
  req.session.user = dtoUser;
  res.send(dtoUser);
};

const current = async (req, res) => {
  res.send(req.user);
  // if (req.user) {
  //   res.render('current', {
  //     name: req.user.firstName,
  //     lastName: req.user.lastName,
  //     email: req.user.email,
  //     role: req.user.role,
  //   });
  // } else {
  //   res.render('login');
  // }
};

module.exports = {
  sessionLogin,
  loginRegister,
  current,
};