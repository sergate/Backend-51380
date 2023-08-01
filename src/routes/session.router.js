const { Router } = require('express');
const userModel = require('../dao/models/users.model');
const viewSession = require('../controller/sessions.controller');
const passport = require('passport');
const { REGISTER_STRATEGY, LOGIN_STRATEGY } = require('../utils/constants');
const { default: isAdmin } = require('../middlewares/isAdmin');
const adminPermission = async (req, res, next) => {
  if (req.session.user.role !== 'admin') {
    return res.status(401).json({
      status: 'error',
      msg: 'Usuario no autorizado',
    });
  }
  next();
};
const router = Router();

router.post('/register', passport.authenticate(REGISTER_STRATEGY), viewSession.sessionLogin);

router.post('/login', passport.authenticate(LOGIN_STRATEGY), viewSession.loginRegister);

router.get('/current', adminPermission, viewSession.current);

module.exports = router;