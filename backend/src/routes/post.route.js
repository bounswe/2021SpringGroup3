const express = require('express');
const validate = require('../middlewares/validate');
const postValidation = require('../validations/post.validation');
const postController = require('../controllers/post.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.route('/').post(validate(postValidation.createPost), auth('createPost'), postController.createPost);
router.route('/').get(validate(postValidation.getPosts), auth('getPosts'), postController.getPosts);

module.exports = router;
