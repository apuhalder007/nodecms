let menu = {};
let speakingurl = require("speakingurl");
let menuModel = require("../../model/backend/menu");
let pageModel = require("../../model/backend/page");
menu.all = function(req, res, next){
    menuModel.find(function(err, menus){
        console.log(menus);
        res.render('backend/menu/menus', {title: "menus", menus:menus});
    })
}

menu.add = function(req, res, next){
    res.render('backend/menu/add-menu', {title: "Add New menu"});
}

menu.addPost = function (req, res, next) {
    errors = [];
    let title = req.body.title;
    //console.log(image);
    req.checkBody('title', 'Please enter a menu title').notEmpty(); 

    var errors = req.validationErrors();
    if (!errors){
        //console.log(title + ' ' + description + ' ' + image.name);
        let menu = new menuModel({
            title: title,
            items: [],
            status: 1 
        });
        menu.save(function(err, menu) {
            if (err) throw err;
            if (menu){
                req.flash('success', [{msg : "menu added successfully!"}]);
                res.redirect('/admin/menus');
            }
        });
    }else{
        req.flash('errors', errors);
        res.redirect("/admin/menu/add");
    }
    
}

menu.edit = function(req, res, next){
    let id = req.params.id;
    let menu = menuModel.findById(id, function(err, menu){
        if(err) throw err;
        if(menu){
            //console.log(menu);

            pageModel.find({},function (err, pages) {
                if (err) throw err;
                res.render('backend/menu/edit-menu', {
                    title: "Edit menu",
                    menu: menu,
                    pages:pages
                });
            });
            
        } 
    })
}
menu.editPost = function(req, res, next){
    
    errors = [];
    let title = req.body.title;
    let order = req.body.order;
    let status = req.body.status;
    let id = req.body.id;
    let items = [];
    console.log(req.body);
    req.checkBody('title', 'Please enter a menu title').notEmpty(); 
    //req.checkBody('image', 'Please upload an image Jpeg, Png or Gif').isImage(filename);
    var errors = req.validationErrors();
    if (!errors){

        var menu = {
            title: title,
            items: items,
            status: status
        };
        
        menuModel.findByIdAndUpdate(id, menu, function(err, menu){
            if(err) throw err;
            if(menu){
                console.log(status);
                req.flash('success', [{msg: "menu edit successfully."}]);
                res.redirect('/admin/menu/edit/'+id);
            }
        })
    }else{
        req.flash('errors', errors);
        res.redirect("/admin/menu/edit/"+id);
    }
   


}

menu.delete = function(req, res, next){
    let id = req.params.id;

    menuModel.findByIdAndRemove(id, function(err, menu){
        if(err) throw err;
        if(menu){
            req.flash("success", [{msg:"menu deleted successfully."}]);
            res.redirect('/admin/menus');
        }
    })
}

module.exports = menu;