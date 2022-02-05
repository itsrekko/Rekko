const express = require('express');
var router = express.Router();
var indexController = require('../controllers/index.controller');

/* GET home page. */
router.get('/', indexController.home);
router.get('/test', indexController.test)
router.get('/getAllUsers', indexController.getAllUsers);
router.post('/createNewUser', indexController.createNewUser);

module.exports = router;
