const crypto = require('crypto');

exports.sha1 = function (data) {
  return crypto.createHash('sha1').update(data.toString()).digest('hex');
};

exports.asyncForEach = async function (array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

exports.checkIfObjectIdArrayIncludesId = function (array = [], _id) {
  return new Set(array.map((a) => (a._id || a).toString())).has(_id);
};