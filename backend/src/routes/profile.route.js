const express = require('express');
const validate = require('../middlewares/validate');
const profileValidation = require('../validations/profile.validation');
const profileController = require('../controllers/profile.controller');

const router = express.Router();

router.route('/').get(validate(postValidation.getPosts), postController.getPosts);
router
  .route('/settings')
  .get(validate(postValidation.getPostDetail), postController.getPostDetail)
  .post(validate(postValidation.getPostDetail), postController.getPostDetail);

module.exports = router;
