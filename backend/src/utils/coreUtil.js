const momentTimezone = require('moment-timezone');

exports.isNull = (variable) => !(typeof variable !== 'undefined' && variable !== null);

exports.toTimezone = (timezone, date = new Date()) => {
  const localDate = `${momentTimezone(date).tz(timezone).format('YYYY-MM-DD HH:mm:ss')} UTC`;
  return new Date(localDate);
};

exports.getRandomActivationNumber = function () {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

exports.getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
