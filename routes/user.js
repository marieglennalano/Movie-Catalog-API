const express = require('express');
const userController = require('../controllers/user');

const { verify } = require("../auth");

//[SECTION] Routing Component
const router = express.Router();

// [SECTION] User Routes Register
router.post('/register', userController.registerUser);

// [SECTION] User Routes Login
router.post('/login', userController.loginUser);

// [SECTION] User Routes Profile
router.get('/details', verify, userController.profile);

module.exports = router;
