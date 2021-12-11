const express = require('express');
const validate = require('../middlewares/validate');
const communityValidation = require('../validations/community.validation');
const communityController = require('../controllers/community.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(communityValidation.createCommunity), communityController.createCommunity)
  .delete(validate(communityValidation.deleteCommunity), communityController.deleteCommunity)
  .get(validate(communityValidation.getCommunities), communityController.getCommunities);

router.route('/detail').get(validate(communityValidation.getCommunityDetail), communityController.getCommunityDetail);

router.route('/join/approve').post(validate(communityValidation.kickFromCommunity), communityController.acceptJoinRequest);
router.route('/join/reject').post(validate(communityValidation.kickFromCommunity), communityController.rejectJoinRequest);
router.route('/join').post(validate(communityValidation.joinCommunity), communityController.joinCommunity);

router.route('/leave').post(validate(communityValidation.leaveCommunity), communityController.leaveCommunity);
router.route('/kick').post(validate(communityValidation.kickFromCommunity), communityController.kickFromCommunity);

module.exports = router;
