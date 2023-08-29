const mongoose = require('mongoose');
const passport = require('passport');
const passportLocal = require('passport-local');
const BdCartManager = require('../dao/mongoManager/BdCartManager');
const BdSessionManager = require('../dao/mongoManager/BdSessionManager');
const { REGISTER_STRATEGY, LOGIN_STRATEGY } = require('./constants');
const { hashpassword, comparePassword } = require('./hashpassword');
const DTOsUser = require('../dao/DTOs/user.dto');

const initPassaport = () => {
  passport.use(
    REGISTER_STRATEGY,
    new passportLocal.Strategy(
      {
        passReqToCallback: true,
        usernameField: 'email',
      },
      async (req, username, password, done) => {
        const { firstName, lastName } = req.body;
        try {
          const exitEmail = await BdSessionManager.getEmail({ email: username });
          console.log(exitEmail);
          if (exitEmail) {
            done(null, false);
          } else {
            const hash = await hashpassword(password);
            const cart = await BdCartManager.CreateCarts();
            const id = mongoose.Types.ObjectId(cart);
            if (username === 'adminCoder@coder.com') {
              const user = await BdSessionManager.createSession({
                firstName: firstName,
                lastName: lastName,
                email: username,
                password: hash,
                role: 'admin',
                cart: id,
              });
              done(null, user);
            } else {
              const user = await BdSessionManager.createSession({
                firstName: firstName,
                lastName: lastName,
                email: username,
                password: hash,
                role: 'user',
                cart: id,
              });
              done(null, user);
            }
          }
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.use(
    LOGIN_STRATEGY,
    new passportLocal.Strategy(
      {
        passReqToCallback: true,
        usernameField: 'email',
      },
      async (req, username, password, done) => {
        try {
          console.log(username, password);
          const user = await BdSessionManager.getEmail({ email: username });

          const isVadidPassword = await comparePassword(password, user.password);
          if (user && isVadidPassword) {
            done(null, user);
          } else {
            done(null, false);
          }
        } catch (error) {
          console.log(error);
          done(null, false);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser(async (_id, done) => {
    const user = await BdSessionManager.UserSession(_id);
    const DTOuser = DTOsUser(user);
    done(null, DTOuser);
  });
};

module.exports = {
  initPassaport,
};