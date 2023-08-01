const { Router } = require('express');
const productsControllerBD = require('../controller/products.controller.bd');
const { default: isAdmin } = require('../middlewares/isAdmin');

const adminPermission = async (req, res, next) => {
  if (req.session.user.role !== 'admin') {
    return res.status(401).json({
      status: 'error',
      msg: 'Usuario no autorizado',
    });
  }
  next();
};

const router = Router();

router.get('/', productsControllerBD.getProductsBd);
router.post('/', adminPermission, productsControllerBD.addProductBd);
router.get('/:pid', productsControllerBD.getProductIdBd);
router.put('/:pid', adminPermission, productsControllerBD.UpdateProductBd);
router.delete('/:pid', adminPermission, productsControllerBD.deleteProductBd);

module.exports = router;