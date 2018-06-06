let menuModel = require("../../model/backend/menu");
let bannerModel = require("../../model/backend/banner");
let pageModel = require("../../model/backend/page");
let forntEndMenu = "Header Menu";
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

/* For Mongoose, when you don't pass in a function as the second parameter, 
the value returned by the function call (e.g. Category.count({})) will be a Promise. 
We will put all of these unresolved Promises in an array and call Promise.all to resolve them. 
By using Promise.all, you are waiting until all of your count queries get executed before moving 
on to render your index view. In this case, the results of your Mongoose function calls will be 
stored in the results array in the order of your queries array. */


pages.default = function(req, res, next) {
    //console.log(req.params.slug);
    let slug = req.params.slug;
    let queries = [
        menuModel.findOne({ title: forntEndMenu}),
        pageModel.findOne({slug:slug})
        
    ];

    Promise.all(queries)
    .then(results => {
        res.render('frontend/default-page', {
            menuItems: results[0].items,
            title: results[1].title,
            content: results[1].content
        });
    })
    .catch(err => {
        res.render('frontend/not-found', { title: "Not Found" });
    });

    
}

pages.not_found = function(req, res){
    res.render('frontend/not-found', { title: "Not Found" });
}
module.exports = pages;

