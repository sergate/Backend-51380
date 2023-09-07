const { Router } = require('express');
const cartsControllerBd = require('../controller/carts.controller.bd');
const permisions = require('../middlewares/permissions');
const router = Router();

router.post('/', cartsControllerBd.createCarts);
router.get('/', cartsControllerBd.bdgetCart);
router.get('/:cid', cartsControllerBd.bdgetCartId);
router.post('/:cid/product/:pid', permisions.userPermission, permisions.premiumPermission, cartsControllerBd.addProductToCart);
router.delete('/:cid/product/:pid', cartsControllerBd.deleteProductToCart);
router.put('/:cid', cartsControllerBd.cartUpdate);
router.put('/:cid/product/:pid', cartsControllerBd.updateQuantityProduct);
router.delete('/:cid', cartsControllerBd.deleteToCart);
router.get('/:cid/purchase', permisions.userPermission, cartsControllerBd.purchase);

module.exports = router;