const { Router } = require('express');
const userModel = require('../dao/models/users.model');
const viewSession = require('../controller/sessions.controller');
const passport = require('passport');
const { REGISTER_STRATEGY, LOGIN_STRATEGY } = require('../utils/constants');
const permisions = require('../middlewares/permissions');
const { getPayload, getPayloadByCookie } = require('../utils/jwt');
const { reviewDocs, saveDocs } = require('../utils/multer.js');
const verifyDocuments = require('../middlewares/verifydocuments');

const router = Router();

router.post('/register', passport.authenticate(REGISTER_STRATEGY), viewSession.sessionLogin);

router.post('/login', passport.authenticate(LOGIN_STRATEGY), viewSession.loginRegister);

router.get('/logout', viewSession.logout);

router.post('/forgot-password', viewSession.forgotPassword);

router.get('/redirectForgotPassword/:token', viewSession.redirectRecoverPassword);

router.post('/forgotpassword', getPayloadByCookie, viewSession.RecoverPassword);

router.post('/premium/:uid', viewSession.updateRole);

router.get('/current', permisions.adminPermission, viewSession.current);

router.post('/:uid/documents', saveDocs, viewSession.uploadDocs);

router.post('/:uid/reviewDocuments', reviewDocs, viewSession.AreDocumentsRepeated);

module.exports = router;