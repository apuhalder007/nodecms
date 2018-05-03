const express = require('express');
const Router = express.Router();
let dashboard = require('../../controller/backend/dashboard');
let bannerController = require('../../controller/backend/banner');
let functions = require('../../utilities/functions');
Router.get('/', functions.loggedIn,  dashboard.home);


//Banners Route
Router.get('/banners', functions.loggedIn,  bannerController.all);
Router.get('/banner/add', bannerController.add);
Router.post('/banner/add', bannerController.addPost);
Router.get('/banner/edit/:id', bannerController.edit);
Router.post('/banner/edit/', bannerController.editPost);
Router.get('/banner/delete/:id', bannerController.delete);
module.exports = Router;