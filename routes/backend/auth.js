const express = require('express');
const Router = express.Router();
let auth = require('../../controller/backend/auth.js');
Router.get('/login', auth.login);
Router.post('/login', auth.loginPost);
Router.get('/user/registration', auth.userRegistration);
Router.post('/user/registration', auth.userRegistrationPost);
Router.get('/logout', auth.logout);
module.exports = Router;