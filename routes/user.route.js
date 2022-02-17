const express = require('express');
var router = express.Router();
var userController = require('../controllers/user.controller');

router.get('/getAllUsers', userController.getAllUsers);
router.post('/checkAndCreateNewUser', userController.createNewUser);

module.exports = router;
