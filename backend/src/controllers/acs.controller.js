const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { acsService, authService } = require('../services');

exports.getACS = catchAsync(async (req, res) => {
  const result = await acsService.getACS({
    acsType: req.query.acsType,
  });
  console.log(result);
  res.send(result);
});

exports.getACSDetail = catchAsync(async (req, res) => {
  const result = await acsService.getACSDetail({
    objectId: req.query.acsId,
    acsType: req.query.acsType,
  });
  res.send(result);
});
