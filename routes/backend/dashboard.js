const express = require('express');
const Router = express.Router();
let dashboard = require('../../controller/backend/dashboard');
let functions = require('../../utilities/functions');
Router.get('/', functions.loggedIn,  dashboard.home);

module.exports = Router;