const express = require('express');
const { fetchAmazonProduct } = require('../controllers/importPrduct');

const router = express.Router();

router.route('/fetch-product').post(fetchAmazonProduct);

module.exports = router;