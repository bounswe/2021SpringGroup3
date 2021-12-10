const express = require('express');
const validate = require('../middlewares/validate');
const postValidation = require('../validations/post.validation');
const postController = require('../controllers/post.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(postValidation.createPost), postController.createPost)
  .get(validate(postValidation.getPosts), postController.getPosts);
router.route('/detail').get(validate(postValidation.getPostDetail), postController.getPostDetail);
router.route('/like').post(validate(postValidation.likePost), postController.likePost);

module.exports = router;
