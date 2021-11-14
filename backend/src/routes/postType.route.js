const express = require('express');
const validate = require('../middlewares/validate');
const postTypeValidation = require('../validations/postType.validation');
const postTypeController = require('../controllers/postType.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .post(validate(postTypeValidation.createPostType), auth('createPostType'), postTypeController.createPostType);
router.route('/').get(validate(postTypeValidation.getPostTypes), auth('getPostTypes'), postTypeController.getPostTypes);

module.exports = router;
