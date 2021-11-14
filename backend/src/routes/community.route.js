const express = require('express');
const validate = require('../middlewares/validate');
const communityValidation = require('../validations/community.validation');
const communityController = require('../controllers/community.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .post(validate(communityValidation.createCommunity), auth('createCommunity'), communityController.createCommunity);
router
  .route('/')
  .get(validate(communityValidation.getCommunities), auth('getCommunities'), communityController.getCommunities);

module.exports = router;
