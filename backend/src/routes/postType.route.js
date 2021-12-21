const express = require('express');
const validate = require('../middlewares/validate');
const postTypeValidation = require('../validations/postType.validation');
const postTypeController = require('../controllers/postType.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(postTypeValidation.createPostType), postTypeController.createPostType)
  .get(validate(postTypeValidation.getPostTypes), postTypeController.getPostTypes);

router.route('/detail').get(validate(postTypeValidation.getPostTypeDetail), postTypeController.getPostTypeDetail);
router.route('/search').get(validate(postTypeValidation.searchPostTypes), postTypeController.searchPostTypes);

module.exports = router;
