const express = require('express');
var router = express.Router();
var indexController = require('../controllers/index.controller');

/* GET home page. */
router.get('/', indexController.home);
router.get('/test', indexController.test)
router.get('/get_all_users', indexController.getAllUsers);
router.post('/check_and_create_new_user', indexController.createNewUser);

module.exports = router;
