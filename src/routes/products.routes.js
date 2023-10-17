const { Router } = require('express');
const productsController = require('../controller/products.controller');
const { premiumPermission, adminPermission } = require('../middlewares/permissions');

const router = Router();

router.get('/', productsController.getProducts);
router.get('/:pid', productsController.getProductId);
router.post('/', premiumPermission, productsController.addProduct);
router.put('/:pid', productsController.UpdateProduct);
router.delete('/:pid', adminPermission, productsController.deleteProduct);

module.exports = router;