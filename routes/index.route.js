const express = require('express');
var router = express.Router();
var indexController = require('../controllers/index.controller');

router.get('/', indexController.home);
router.get('/test', indexController.test)

module.exports = router;