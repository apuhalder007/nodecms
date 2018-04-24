const express = require('express');
const router = express.Router();
router.get('/', (req, res)=>{
    res.render('frontend/index', {title: "Welcome to the brand!"});
});

router.get('/about-us', (req, res)=>{
    res.render('frontend/about-us', {title: "About Us"});
});

router.get('/tour', (req, res)=>{
    res.render('frontend/tour', {title: "Tour"});
});

router.get('/contact-us', (req, res)=>{
    res.render('frontend/contact-us', {title: "Contact Us"});
});
router.get('*', (req, res)=>{
    res.render('frontend/not-found', {title: "Not Found"});
});

module.exports = router;