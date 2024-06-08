const express = require('express');
const {signUpController} = require('./controllers/signupController.js');
const {getAllUsers} = require('./controllers/testController.js');
const {loginController} = require('./controllers/loginController.js');
const router = express.Router();


router.post('/',signUpController);
router.post('/login',loginController);
router.get('/test/getAllUsers',getAllUsers);

module.exports = {router};