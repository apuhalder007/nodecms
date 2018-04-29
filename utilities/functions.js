let functions = {};
functions.loggedIn = function(req, res, next){
    if(req.session.loggedIn){
        next();
    }else{
        res.redirect('/admin/login');
    }
}

module.exports = functions;