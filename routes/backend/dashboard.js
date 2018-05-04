const express = require('express');
const Router = express.Router();
let dashboard = require('../../controller/backend/dashboard');
let bannerController = require('../../controller/backend/banner');
let pageController = require('../../controller/backend/page');
let functions = require('../../utilities/functions');
Router.get('/', functions.loggedIn,  dashboard.home);


//Banners Route
Router.get('/banners', functions.loggedIn,  bannerController.all);
Router.get('/banner/add', bannerController.add);
Router.post('/banner/add', bannerController.addPost);
Router.get('/banner/edit/:id', bannerController.edit);
Router.post('/banner/edit/', bannerController.editPost);
Router.get('/banner/delete/:id', bannerController.delete);

//page Route
Router.get('/pages', functions.loggedIn, pageController.all);
Router.get('/page/add', pageController.add);
Router.post('/page/add', pageController.addPost);
Router.get('/page/edit/:id', pageController.edit);
Router.post('/page/edit/', pageController.editPost);
Router.get('/page/delete/:id', pageController.delete);
module.exports = Router;