
let auth = {};
auth.login = function(req, res){
    if(req.session.loggedIn) res.redirect('/admin');
    res.render('backend/auth/login', {title: 'Login Page'});
}

auth.loginPost = function(req, res){
    //res.render('backend/auth/login', {title: 'Login Page'});
    req.session.loggedIn = false;
    let username = req.body.username;
    let password = req.body.password;
    console.log(username+ ' '+ password);
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();

    var errors = req.validationErrors();
    console.log(errors);
    if(errors){
        req.flash('errors', errors);
        res.redirect('/admin/login');
    }else{
        if(username == 'admin' && password == 'admin'){
            req.session.loggedIn = true;
            req.session.user = {username : username, password : password};
            res.redirect('/admin/');
        }else{
            errors = [{msg:"Invalid username or password!"}];
            req.flash('errors', errors);
            res.redirect('/admin/login');
        }
    }

}
auth.logout = function(req, res, next){
    req.session.loggedIn = false;
    req.session.user = null;
    //req.session = null;
    successMessages = [{msg: "You have been successfully logout!"}];
    req.flash('success', successMessages);
    res.redirect('/admin/login');
}
module.exports = auth;