const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const httpStatus = require('http-status');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const config = require('./config/config');
const morgan = require('./config/morgan');
const { authLimiter } = require('./middlewares/rateLimiter');
const auth = require('./middlewares/auth');
const routes = require('./routes');
const { errorConverter, errorHandler } = require('./middlewares/error');
const { ApiError } = require('./utils');

const app = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json({ limit: '50mb' }));

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/auth', authLimiter);
}

app.use((req, res, next) => {
  if (!['ANDROID', 'WEB'].includes(req.headers['x-platform']) && !req.path.includes('/docs')) {
    return next(new ApiError(httpStatus.BAD_REQUEST, 'Invalid X-Platform header'));
  }
  next();
});

app.use(auth());

// api routes
app.use(routes);

app.get('/', function (req, res) {
  res.send('Hello');
});

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

app.use(errorConverter);

app.use(errorHandler);

module.exports = app;
