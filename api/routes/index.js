var express = require('express');
var ctrlTax = require('../controller/taxrate.controller');
var router = express.Router();

router
    .route('/taxrate')
    .get(ctrlTax.taxRate2017);

router
    .route('/calculateTax/:income')
    .get(ctrlTax.calculateTax);
module.exports = router;