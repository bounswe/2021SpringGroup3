const OneSignal = require('onesignal-node');

const config = require('../config/config');
const logger = require('../config/logger');

const client = new OneSignal.Client(config.onesignal.appId, config.onesignal.apiKey);

exports.createNotification = async ({ message, data, notificationIds }) => {
  const notification = {
    contents: {
      en: message,
    },
    include_player_ids: notificationIds,
    data,
  };

  try {
    const response = await client.createNotification(notification);
    console.log(response.body.id);
  } catch (e) {
    if (config.env === 'development') {
      logger.error(e);
    }
  }
};
