const express = require('express');
const validate = require('../middlewares/validate');
const profileValidation = require('../validations/profile.validation');
const profileController = require('../controllers/profile.controller');

const router = express.Router();

router.route('/').get(profileController.getProfile);
router.post('/settings', validate(profileValidation.setProfile), profileController.setProfile);
router.route('/settings').get(profileController.getProfileSettings).delete(profileController.deleteProfile);

router.route('/other').get(validate(profileValidation.getOtherProfile), profileController.getOtherProfile);

router.post('/setNotificationId', validate(profileValidation.setNotificationId), profileController.setNotificationId);
router.route('/search').get(validate(profileValidation.search), profileController.search);
router.route('/recommend').get(profileController.recommend);

router.route('/follow').get(validate(profileValidation.follow), profileController.followProfile);
router.route('/unfollow').get(validate(profileValidation.follow), profileController.unfollowProfile);
router.route('/approve').get(validate(profileValidation.follow), profileController.approveFollowRequest);
router.route('/reject').get(validate(profileValidation.follow), profileController.rejectFollowRequest);
router.route('/notification').get(profileController.getNotifications);

module.exports = router;
