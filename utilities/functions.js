let functions = {};
const menuModel = require('../model/backend/menu');

functions.loggedIn = function(req, res, next){
    if(req.session.loggedIn){
        next();
    }else{
        res.redirect('/admin/login');
    }
}
 function frontendMenu (){
    let menuItems = [];
    let response =  menuModel.findOne({ title:'Header Menu'}, function(err, menu){
        if(err) throw err;
    })
     console.log(response);
     return response;
}
functions.frontendMenu = frontendMenu;
module.exports = functions;