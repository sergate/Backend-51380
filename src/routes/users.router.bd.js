const { Router } = require('express');
const { getUsers, insertUser, updateUser, deleteUser, deleteLast2days } = require('../controller/users.controller.bd');
// const sessionController = require('../controller/session.controller');
const { saveDocs } = require('../utils/multer');
const { adminPermission } = require('../middlewares/permissions');

const userRouter = Router();

userRouter.get('/', adminPermission, getUsers);
userRouter.post('/', insertUser);
userRouter.put('/', updateUser);
userRouter.delete('/:id', deleteUser);
userRouter.delete('/deletelast', adminPermission, deleteLast2days);
// userRouter.post('/premium/:uid', sessionController.updateRole);
module.exports = userRouter;