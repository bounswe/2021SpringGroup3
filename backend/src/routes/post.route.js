const express = require('express');
const validate = require('../middlewares/validate');
const postValidation = require('../validations/post.validation');
const postController = require('../controllers/post.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(postValidation.createPost), postController.createPost)
  .delete(validate(postValidation.deletePost), postController.deletePost)
  .get(validate(postValidation.getPosts), postController.getPosts);
router.route('/detail').get(validate(postValidation.getPostDetail), postController.getPostDetail);
router.route('/like').post(validate(postValidation.likePost), postController.likePost);
router.route('/unlike').post(validate(postValidation.unlikePost), postController.unlikePost);
router.route('/comment').post(validate(postValidation.createComment), postController.createComment);
router.route('/homepage').get(postController.getHomepage);
router.route('/search').get(validate(postValidation.search), postController.search);
router.route('/advancedSearch').post(validate(postValidation.advancedSearch), postController.advancedSearch);

module.exports = router;
