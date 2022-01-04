exports.CleanEmptyValuesObject = obj => {
  for (var propName in obj) {
    if (
      obj[propName] === '' ||
      obj[propName] === undefined ||
      obj[propName] === null ||
      obj[propName].value === null
    ) {
      delete obj[propName];
    }
  }
  return obj;
};
