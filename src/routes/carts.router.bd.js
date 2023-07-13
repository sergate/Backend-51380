const {Router} = require('express');
const cartsControllerBd = require('../controller/carts.controller.bd')


const router =  Router();

router.post('/', cartsControllerBd.createCarts)
router.get('/', cartsControllerBd.bdgetCart)
router.get('/:cid', cartsControllerBd.bdgetCartId)
router.post('/:cid/product/:pid', cartsControllerBd.addProductToCart);
router.delete('/:cid/product/:pid', cartsControllerBd.deleteProductToCart);
router.put('/:cid',cartsControllerBd.cartUpdate);
router.put('/:cid/product/:pid',cartsControllerBd.updateQuantityProduct);
router.delete('/:cid',cartsControllerBd.deleteToCart);

module.exports = router;