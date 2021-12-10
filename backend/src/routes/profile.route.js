const express = require('express');
const validate = require('../middlewares/validate');
const profileValidation = require('../validations/profile.validation');
const profileController = require('../controllers/profile.controller');

const router = express.Router();

router.route('/').get(profileController.getProfile);
router
  .route('/settings')
  .get(profileController.getProfileSettings)
  .post(validate(profileValidation.setProfile), profileController.setProfile);

router.route('/other').get(profileController.getOtherProfile);

module.exports = router;
