let pages = {};

pages.home = function(req, res){
    res.render('frontend/index', { title: "Welcome to the brand!" });
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
pages.not_found = function(req, res){
    res.render('frontend/not-found', { title: "Not Found" });
}
module.exports = pages;