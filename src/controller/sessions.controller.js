const { hash } = require('bcrypt');
const DTOsUser = require('../dao/DTOs/user.dto');
const userModel = require('../dao/models/users.model');
const BdSessionManager = require('../dao/mongoManager/BdSessionManager');
const mailingService = require('../service/mailing.service');
const { getUser } = require('../service/users.service');
const { comparePassword, hashpassword } = require('../utils/hashpassword');
const { generateToken, getPayload } = require('../utils/jwt');
const BdUsersManager = require('../dao/mongoManager/BdUsersManager');

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
};

const forgotPassword = async (req, res, next) => {
  try {
    let { email } = req.body;
    const user = await BdSessionManager.getEmail({ email: email });
    if (user === null) {
      return res.status(404).json({ message: 'Mail no valido' });
    }
    let token = generateToken({ id: user.id });
    mailingService.sendMail({
      to: user.email,
      subject: `Hola${user.firstName}`,
      html: `<a href="http://localhost:8080/api/session/redirectForgotPassword/${token}">aqui</a>`,
    });
    res.json({
      status: 'sucess',
      message: `Se envio un correo de recuperacion a ${user.email}`,
    });
  } catch (error) {
    return res.send({ status: 'error', message: 'El email es inválido' });
  }
};

const redirectRecoverPassword = (req, res, next) => {
  try {
    console.log(req.params.token);
    const token = req.params.token;
    res.cookie('token', token).redirect(`/recover-password`);
  } catch (error) {
    next(error);
  }
};

const RecoverPassword = async (req, res, next) => {
  try {
    const password = await comparePassword(req.body.password, req.payload.password);
    if (!password) {
      const hashNewPassword = await hashpassword(req.body.password);
      const updateUser = await BdSessionManager.updatePassword(hashNewPassword, req.payload.id);

      return res.cookie('token', '', { maxAge: 1 }).status(202).json({
        status: 'sucess',
        message: 'La contraseña es muy original. Cambio efectuado con exito',
      });
    } else {
      res.status(403).json({
        status: 'error',
        message: 'La contraseña no puede ser igual a la que olvido genio',
      });
    }
  } catch (error) {
    next(error);
  }
};

const updateRole = async (req, res) => {
  const id = req.params.uid;
  const rol = req.body;
  const user = req.user;

  if (req.user.role === 'user') {
    const update = await BdSessionManager.UpdateRole(id, rol);
    return res.status(200).json({
      status: 'success',
      message: 'Rol actualizado',
      data: update,
    });
  } else {
    req.user.role === 'premium';
    const update = await BdSessionManager.UpdateRole(id, rol);
    return res.status(200).json({
      status: 'success',
      message: 'Rol actualizado',
      data: update,
    });
  }
};
module.exports = {
  sessionLogin,
  loginRegister,
  current,
  forgotPassword,
  redirectRecoverPassword,
  RecoverPassword,
  updateRole,
};