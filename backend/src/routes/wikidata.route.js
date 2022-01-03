const express = require('express');
const wikidataController = require('../controllers/wikidata.controller');

const router = express.Router();

router.route('/').get(wikidataController.wikidata);

module.exports = router;
