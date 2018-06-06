let functions = {};
const menuModel = require('../model/backend/menu');
const deasync = require('deasync');

functions.loggedIn = function(req, res, next){
    if(req.session.loggedIn){
        next();
    }else{
        res.redirect('/admin/login');
    }
}
 function get_menu_items(){
    return new Promise(function (resolve, reject) {
        menuModel.findOne({ title:'Header Menu'}, function(err, menu){
            
            menuModel.findOne({
                title: 'Header Menu'
            }, function (err, menu) {

                if (err) reject(err);
                resolve(menu.items);
            })
           
        })

    })

}
functions.frontendMenu = function(){
    var initializePromise = get_menu_items();
    var menuItems = null;
    var sync = true
    initializePromise.then(function (result) {
        console.log("Initialized user details");
        // Use user details from here
        console.log(result)
        menuItems = result;
        sync = false;
    }, function (err) {
        console.log(err);
    })
    while (sync) { require('deasync').sleep(1); }
    return menuItems;
}
    ;
module.exports = functions;