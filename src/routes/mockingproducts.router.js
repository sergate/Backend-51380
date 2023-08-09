const { Router } = require('express');
const mockingController = require('../controller/mockingProductsController.bd');

const router = Router();

router.get('/', mockingController.get);

module.exports = router;