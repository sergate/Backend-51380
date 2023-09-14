const { Router } = require('express');
const productsControllerBD = require('../controller/products.controller.bd');
const permisions = require('../middlewares/permissions');
const router = Router();

router.get('/', productsControllerBD.getProductsBd);
router.post('/', productsControllerBD.addProductBd);
router.get('/:pid', productsControllerBD.getProductIdBd);
router.put('/:pid', permisions.adminPermission, productsControllerBD.UpdateProductBd);
router.delete('/:pid', permisions.adminPermission, productsControllerBD.deleteProductBd);

module.exports = router;