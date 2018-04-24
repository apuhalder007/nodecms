const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
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

router.post('/contact-us',
[
    check('email')
    // Every validator method in the validator lib is available as a
    // method in the check() APIs.
    // You can customize per validator messages with .withMessage()
    .isEmail().withMessage('must be an email')

    // Every sanitizer method in the validator lib is available as well!
    .trim()
    .normalizeEmail(),

    // ...or throw your own errors using validators created with .custom()
    // .custom(value => {
    //     return findUserByEmail(value).then(user => {
    //     throw new Error('this email is already in use');
    //     })
    // }),

    // No special validation required? Just check if data exists:
    check('name').isEmpty().withMessage('must be fill').trim(),

    // No special validation required? Just check if data exists:
    check('comments').isEmpty().withMessage('must be fill').trim()

], 
(req, res, next)=>{
     
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }else{
        res.end(JSON.stringify(req.body, null, 2));
    }
    
});

router.get('*', (req, res)=>{
    res.render('frontend/not-found', {title: "Not Found"});
});

module.exports = router;