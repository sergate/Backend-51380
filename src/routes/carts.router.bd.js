const { Router } = require('express');
const cartsControllerBd = require('../controller/carts.controller.bd');
const userPermission = require('../middlewares/isUser');

const router = Router();

router.post('/', cartsControllerBd.createCarts);
router.get('/', userPermission, cartsControllerBd.bdgetCart);
router.get('/:cid', cartsControllerBd.bdgetCartId);
router.post('/:cid/product/:pid', userPermission, cartsControllerBd.addProductToCart);
router.delete('/:cid/product/:pid', cartsControllerBd.deleteProductToCart);
router.put('/:cid', cartsControllerBd.cartUpdate);
router.put('/:cid/product/:pid', cartsControllerBd.updateQuantityProduct);
router.delete('/:cid', userPermission, cartsControllerBd.deleteToCart);
router.get('/:cid/purchase', userPermission, cartsControllerBd.purchase);

module.exports = router;