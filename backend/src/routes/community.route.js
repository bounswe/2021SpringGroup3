const express = require('express');
const validate = require('../middlewares/validate');
const communityValidation = require('../validations/community.validation');
const communityController = require('../controllers/auth.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.route('/').post(auth('createCommunity'), validate(communityValidation.createCommunity), communityController.logout);
router.route('/').get(auth('getCommunities'), validate(communityValidation.getCommunities), communityController.logout);

module.exports = router;
