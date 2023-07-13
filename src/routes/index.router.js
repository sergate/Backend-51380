const { Router } = require('express');
const productsRoute = require('./products.routes');
const cardsRoute = require('./carts.routes');
const productsRouteBd = require('./products.router.bd');
const cartsRouteBd = require('./carts.router.bd');
const viewRoute = require('./views.route');
const routerSession = require('./session.router');
const chatsRouter = require('./chats.router');

const router = Router();

router.use('/api/products/', productsRoute);
router.use('/api/carts/', cardsRoute);
router.use('/', viewRoute);
router.use('/api/session/', routerSession);
router.use('/api/productsBd/', productsRouteBd);
router.use('/api/cartsBd/', cartsRouteBd);
router.use('/api/chats/', chatsRouter);

module.exports = router;
