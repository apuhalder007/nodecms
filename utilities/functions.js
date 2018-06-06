let functions = {};
const menuModel = require('../model/backend/menu');

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
    initializePromise.then(function (result) {
        console.log("Initialized user details");
        // Use user details from here
        console.log(result)
        return result;
    }, function (err) {
        console.log(err);
    })
}
    ;
module.exports = functions;