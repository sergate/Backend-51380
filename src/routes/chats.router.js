const { Router } = require('express');
const chatsController = require('../controller/views.chat.controller');

const userChat = async (req, res, next) => {
  if (req.session.user.role !== 'user') {
    return res.status(401).json({
      status: 'error',
      msg: 'Usuario no autorizado',
    });
  }
  next();
};

const router = Router();

router.get('/', chatsController.getsendMessage);
router.post('/', userChat, chatsController.sendMessage);
router.delete('/:chid', chatsController.deleteMessage);

module.exports = router;