const express = require('express');
const validate = require('../middlewares/validate');
const profileValidation = require('../validations/profile.validation');
const profileController = require('../controllers/profile.controller');

const router = express.Router();

router.route('/').get(profileController.getProfile);
router
  .route('/settings')
  .get(profileController.getProfileSettings)
  .delete(profileController.deleteProfile)
  .post(validate(profileValidation.setProfile), profileController.setProfile);

router.route('/other').get(validate(profileValidation.getOtherProfile), profileController.getOtherProfile);

router.post('/setNotificationId', validate(profileValidation.setNotificationId), profileController.setNotificationId);
router.route('/search').get(validate(profileValidation.search), profileController.search);

module.exports = router;
