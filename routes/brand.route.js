const express = require('express');
var router = express.Router();
var brandController = require('../controllers/brands.controller');

router.post('/', brandController.addNewBrand);

router.get('/', brandController.getAllBrands);

module.exports = router;