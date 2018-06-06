let userModel = require('../../model/backend/user');
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
    if(errors){
        req.flash('errors', errors);
        res.redirect('/admin/login');
    }else{
        userModel.find({"username":username, "password" : password}, function(err, user){
            console.log(err);
            console.log(user.length);
            if(user.length && user[0].role == "admin"){
                req.session.loggedIn = true;
                req.session.user = {username : username, password : password};
                res.redirect('/admin/');
            }else{
                errors = [{msg:"Invalid username or password!"}];
                req.flash('errors', errors);
                res.redirect('/admin/login');
            }
        });
        
    }

}

auth.userRegistration = function(req, res, next){
    res.send("User Registration Route!");
}
auth.userRegistrationPost = function(req, res, next){

    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    console.log(username+ ' '+ password);
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('email', 'Password is required').notEmpty();
    
    var errors = req.validationErrors();
    
    if(!errors){
        let addUser = new userModel({
            username : username,
            password:password,
            email:email
        });
        addUser.save(function(err, user){
            console.log(user);
        });
    }else{
        req.flash('errors', errors);
        res.redirect('/user/registration');
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