const https = require('https');
const catchAsync = require('../utils/catchAsync');

exports.wikidata = catchAsync(async (req, res) => {
  https
    .get(
      `https://www.wikidata.org/w/api.php?action=wbsearchentities&language=en&format=json&search=${req.query.query}`,
      (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
          data += chunk;
        });
        resp.on('end', () => {
          res.send(JSON.parse(data).search);
        });
      }
    )
    .on('error', (err) => {
      res.send(`Error: ${err.message}`);
    });
});
