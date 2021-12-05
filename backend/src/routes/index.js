const express = require('express');
const authRoute = require('./auth.route');
const docsRoute = require('./docs.route');
const postTypeRoute = require('./postType.route');
const postRoute = require('./post.route');
const profileRoute = require('./profile.route');
const communityRoute = require('./community.route');
const config = require('../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/communities',
    route: communityRoute,
  },
  {
    path: '/post-types',
    route: postTypeRoute,
  },
  {
    path: '/posts',
    route: postRoute,
  },
  {
    path: '/profile',
    route: profileRoute,
  },
];

const devRoutes = [
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
