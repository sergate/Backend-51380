const { mailing } = require('../config/config');
const DTOsUser = require('../dao/DTOs/user.dto');
const { userService } = require('../service/index.repository');
const nodemailer = require('nodemailer');
const moment = require('moment');
const Mailing = require('../service/mailing.service');
const { deleteLast } = require('../dao/mongoManager/BdUsersManager');
const BdUsersManager = require('../dao/mongoManager/BdUsersManager');
const mailingService = require('../service/mailing.service');

const getUsers = async (req, res) => {
  try {
    const users = await userService.getUser({}, 'firstName  lastName email role');

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

const insertUser = async (req, res) => {
  const { user } = req.body;
  const userDTO = new DTOsUser(user);
  const newUser = await userService.insertUser(userDTO);
  res.json({ msg: 'ok', newUser });
};

const updateUser = async (req, res) => {
  const { id, user } = req.body;
  const newUser = await userService.updateUser(user, id);
  res.json({ msg: 'ok', newUser });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  await userService.delete(id);
  res.json({ msg: 'ok' });
};

const deleteLast2days = async (req, res, next) => {
  try {
    let users = await BdUsersManager.get();

    let deleteUsers = [];

    // const expirationTime = moment().subtract(30, 'minutes'); // Fecha de prueba
    const expirationTime = moment().subtract(2, 'days'); // Fecha correcta
    let count = 0;

    users.forEach((user) => {
      if (!user.last_connection) {
        count += 1;
        deleteUsers.push(user.email);
        return;
      }
      let userDate = moment(user.last_connection, 'DD/MM/YYYY, hh:mm:ss');
      if (userDate.isBefore(expirationTime) && user.role != 'admin') {
        try {
          mailingService.sendMail({
            to: user.email,
            subject: 'Se ha eliminado tu cuenta debido a inactividad',
            html: `
                    <div style="background-color: black; color: green; display: flex; flex-direction: column; justify-content: center;  align-items: center;">
                    <h1>Tu cuenta ha sido eliminada!</h1>
                    </div>
                    `,
          });
        } catch (error) {
          req.logger.error('El mail del usuario no es válido');
        }
        count += 1;
        deleteUsers.push(user.email);
      }
    });

    let deleted = await BdUsersManager.deleteMany(deleteUsers);

    if (deleted.length < 1) return res.send({ status: 'Ok', message: `${count} cuentas fueron eliminadas con los mails ${deleteUsers}` });
    res.send({ status: 'error', message: `Las cuentas con los mails ${deleted} no han podido eliminarse` });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  insertUser,
  updateUser,
  deleteUser,
  deleteLast2days,
};