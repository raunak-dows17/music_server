const express = require('express');
const router = express.Router();
const {RegisterController, LoginController, UserProfile, changeUsername, changePassword} = require('../controllers/userController');

router.post('/register', RegisterController);
router.post("/login", LoginController);
router.get("/profile", UserProfile);
router.patch('/change-username', changeUsername);
router.patch('/change-password', changePassword);

module.exports = router;
