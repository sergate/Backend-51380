//cokies

const sessionLogin = async (req, res) => {
  res.send(req.user);
};

const loginRegister = async (req, res) => {
  res.send(req.user);
};

const current = async (req, res) => {
  if (req.user) {
    res.render('current', {
      name: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
    });
  } else {
    res.render('login');
  }
};

module.exports = {
  sessionLogin,
  loginRegister,
  current,
};