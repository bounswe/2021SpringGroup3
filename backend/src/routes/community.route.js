const express = require('express');
const validate = require('../middlewares/validate');
const communityValidation = require('../validations/community.validation');
const communityController = require('../controllers/community.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(communityValidation.createCommunity), communityController.createCommunity)
  .delete(validate(communityValidation.getCommunityDetail), communityController.deleteCommunity)
  .get(validate(communityValidation.getCommunities), communityController.getCommunities);

router.route('/detail').get(validate(communityValidation.getCommunityDetail), communityController.getCommunityDetail);

router
  .route('/join/moderators/reject')
  .post(validate(communityValidation.kickFromCommunity), communityController.rejectModeratorRequest);
router
  .route('/join/moderators/approve')
  .post(validate(communityValidation.kickFromCommunity), communityController.approveModeratorRequest);
router.route('/join/approve').post(validate(communityValidation.kickFromCommunity), communityController.acceptJoinRequest);
router.route('/join/reject').post(validate(communityValidation.kickFromCommunity), communityController.rejectJoinRequest);
router.route('/join/moderators').post(validate(communityValidation.joinCommunity), communityController.joinModerators);
router.route('/join').post(validate(communityValidation.joinCommunity), communityController.joinCommunity);

router.route('/leave').post(validate(communityValidation.leaveCommunity), communityController.leaveCommunity);
router.route('/kick').post(validate(communityValidation.kickFromCommunity), communityController.kickFromCommunity);
router.route('/update').post(validate(communityValidation.updateCommunity), communityController.updateCommunity);

module.exports = router;
