const { Router } = require('express');
const cartsControllerBd = require('../controller/carts.controller.bd');
const { default: isUser } = require('../middlewares/isUser');

const userPermission = async (req, res, next) => {
  if (req.session.user.role !== 'user') {
    return res.status(401).json({
      status: 'error',
      msg: 'Usuario no autorizado',
    });
  }
  next();
};
const router = Router();

router.post('/', cartsControllerBd.createCarts);
router.get('/', cartsControllerBd.bdgetCart);
router.get('/:cid', cartsControllerBd.bdgetCartId);
router.post('/:cid/product/:pid', userPermission, cartsControllerBd.addProductToCart);
router.delete('/:cid/product/:pid', cartsControllerBd.deleteProductToCart);
router.put('/:cid', cartsControllerBd.cartUpdate);
router.put('/:cid/product/:pid', cartsControllerBd.updateQuantityProduct);
router.delete('/:cid', userPermission, cartsControllerBd.deleteToCart);
router.post('/:cid/purchase', userPermission, cartsControllerBd.purchase);

module.exports = router;