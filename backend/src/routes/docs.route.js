const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../resource/swagger.json');
const acsController = require('../controllers/acs.controller');

const router = express.Router();

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument));
router.route('/acs').get(acsController.getACS);
router.route('/acs/detail').get(acsController.getACSDetail);

module.exports = router;
