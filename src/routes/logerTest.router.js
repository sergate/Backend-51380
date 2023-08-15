const { Router } = require('express');
const testLogger = require('../controller/loggerTest.controller');

const router = Router();

router.get('/', testLogger.tesTer);

module.exports = router;