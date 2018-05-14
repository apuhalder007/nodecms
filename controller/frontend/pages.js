let bannerModel = require("../../model/backend/banner");
let pageModel = require("../../model/backend/page");
let pages = {};

pages.home = function(req, res){
    bannerModel.find({}, function(err, banners){
        res.render('frontend/index', { title: "Welcome to the brand!" , banners:banners });
    })
    
}
pages.about = function (req, res) {
    res.render('frontend/about-us', { title: "About Us" });
}
pages.tour = function (req, res) {
    res.render('frontend/tour', { title: "Tour" });
}
pages.contact = function (req, res) {
    res.render('frontend/contact-us', { title: "Contact Us" });
}
pages.contact_post = function (req, res) {

    let name = req.body.name;
    let email = req.body.email;
    let comments = req.body.comments;

    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Enter a valid email').isEmail();

    var errors = req.validationErrors();
    if (errors) {
        req.session.errors = errors;
        req.session.success = false;
        req.flash('errors', errors);
        res.redirect('/contact-us');
        //return res.status(422).json({ errors: errors });
    }
    else {
        req.session.success = true;
        //res.redirect('/');
        res.end(JSON.stringify(req.body, null, 2));
    }
}

pages.default = function(req, res, next) {
    //console.log(req.params.slug);
    let slug = req.params.slug;
    pageModel.findOne({ slug: slug}, function(err, page){
        if (err) res.render('frontend/not-found', { title: "Not Found" });
        if (page){
            res.render('frontend/default-page', { title: page.title, content:page.content });
        }else{
            res.render('frontend/not-found', { title: "Not Found" });
        }
    })
    
}

pages.not_found = function(req, res){
    res.render('frontend/not-found', { title: "Not Found" });
}
module.exports = pages;