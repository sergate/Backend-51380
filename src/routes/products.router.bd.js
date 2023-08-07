const { Router } = require('express');
const productsControllerBD = require('../controller/products.controller.bd');
const { default: isAdmin } = require('../middlewares/isAdmin');
const adminPermission = require('../middlewares/isAdmin');

const router = Router();

router.get('/', productsControllerBD.getProductsBd);
router.post('/', adminPermission, productsControllerBD.addProductBd);
router.get('/:pid', productsControllerBD.getProductIdBd);
router.put('/:pid', adminPermission, productsControllerBD.UpdateProductBd);
router.delete('/:pid', adminPermission, productsControllerBD.deleteProductBd);

module.exports = router;