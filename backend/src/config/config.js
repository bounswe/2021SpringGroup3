const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env.example') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    SERVER_URL: Joi.string().uri().default('https://api.cmpegroupthree.store/'),
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    ONESIGNAL_APP_ID: Joi.string().default('').description('Onesignal app id'),
    ONESIGNAL_API_KEY: Joi.string().default('').description('Onesignal api key'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGODB_URL,
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
  },
  serverUrl: envVars.SERVER_URL,
  onesignal: {
    appId: envVars.ONESIGNAL_APP_ID,
    apiKey: envVars.ONESIGNAL_API_KEY,
  },
};
