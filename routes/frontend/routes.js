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

router.post('/contact-us',(req, res)=>{


    let name = req.body.name;
    let email = req.body.email;
    let comments = req.body.comments;

    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Enter a valid email').isEmail();

    var errors = req.validationErrors();
    if (errors) {
        req.session.errors = errors;
        req.session.success = false;
        //res.redirect('/blockchain');
        return res.status(422).json({ errors: errors });
    }
    else {
        req.session.success = true;
        //res.redirect('/');
        res.end(JSON.stringify(req.body, null, 2));
    }
    
});

router.get('*', (req, res)=>{
    res.render('frontend/not-found', {title: "Not Found"});
});

module.exports = router;