const { Router } = require('express');
const chatsController = require('../controller/views.chat.controller');
const permisions = require('../middlewares/permissions');
const router = Router();

router.get('/', chatsController.getsendMessage);
router.post('/', permisions.userPermission, chatsController.sendMessage);
router.delete('/:chid', chatsController.deleteMessage);

module.exports = router;