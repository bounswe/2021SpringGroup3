const express = require('express');
const validate = require('../middlewares/validate');
const authValidation = require('../validations/auth.validation');
const authController = require('../controllers/auth.controller');

const router = express.Router();

router.post('/register', validate(authValidation.register), authController.register);
router.post('/login', validate(authValidation.login), authController.login);
router.route('/logout').delete(authController.logout);
router.post('/changePassword', validate(authValidation.changePassword), authController.changePassword);

module.exports = router;
