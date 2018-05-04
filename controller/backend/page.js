let page = {};
let speakingurl = require("speakingurl");
let pageModel = require("../../model/backend/page");
page.all = function(req, res, next){
    pageModel.find(function(err, pages){
        console.log(pages);
        res.render('backend/page/pages', {title: "pages", pages:pages});
    })
}

page.add = function(req, res, next){
    res.render('backend/page/add-page', {title: "Add New page"});
}

page.addPost = function (req, res, next) {
    errors = [];
    let title = req.body.title;
    let content = req.body.content;
    let slug = req.body.slug;
    let order = req.body.order;
    //console.log(image);
    req.checkBody('title', 'Please enter a page title').notEmpty(); 

    var errors = req.validationErrors();
    if (!errors){
        if(slug != ""){
            var formatSlug = speakingurl(slug);
        }else{
            var formatSlug = speakingurl(title);
        }
        
        //console.log(title + ' ' + description + ' ' + image.name);
        let page = new pageModel({
            title: title,
            slug: formatSlug,
            content: content,
            order: order,
            status: 1 
        });
        page.save(function(err, page) {
            if (err) throw err;
            if (page){
                req.flash('success', [{msg : "page added successfully!"}]);
                res.redirect('/admin/pages');
            }
        });
    }else{
        req.flash('errors', errors);
        res.redirect("/admin/page/add");
    }
    
}

page.edit = function(req, res, next){
    let id = req.params.id;
    let page = pageModel.findById(id, function(err, page){
        if(err) throw err;
        if(page){
            console.log(page);
            res.render('backend/page/edit-page', {title: "Edit page", page:page});
        } 
    })
}
page.editPost = function(req, res, next){
    
    errors = [];
    let title = req.body.title;
    let content = req.body.content;
    let slug = req.body.slug;
    let order = req.body.order;
    let id = req.body.id;
    //console.log(image);
    req.checkBody('title', 'Please enter a page title').notEmpty(); 
    req.checkBody('slug', 'Please enter a page title').notEmpty(); 
    //req.checkBody('image', 'Please upload an image Jpeg, Png or Gif').isImage(filename);
    var errors = req.validationErrors();
    if (!errors){

        var page = {
            title: title,
            slug: slug,
            content: content,
            order: order,
            status: 1 
        };
        
        pageModel.findByIdAndUpdate(id, page, function(err, page){
            if(err) throw err;
            if(page){
                req.flash('success', [{msg: "page edit successfully."}]);
                res.redirect('/admin/page/edit/'+id);
            }
        })
    }else{
        req.flash('errors', errors);
        res.redirect("/admin/page/edit/"+id);
    }
   


}

page.delete = function(req, res, next){
    let id = req.params.id;

    pageModel.findByIdAndRemove(id, function(err, page){
        if(err) throw err;
        if(page){
            req.flash("success", [{msg:"page deleted successfully."}]);
            res.redirect('/admin/pages');
        }
    })
}

module.exports = page;