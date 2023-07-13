const { Router } = require('express');
const userModel = require('../dao/models/users.model');
const viewSession = require('../controller/sessions.controller');
const passport = require('passport');
const { REGISTER_STRATEGY, LOGIN_STRATEGY } = require('../utils/constants');

const router = Router();

router.post('/register', passport.authenticate(REGISTER_STRATEGY), viewSession.sessionLogin);

router.post('/login', passport.authenticate(LOGIN_STRATEGY), viewSession.loginRegister);

router.get('/current', viewSession.current);

module.exports = router;
