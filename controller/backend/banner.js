let banner = {};
let bannerModel = require("../../model/backend/banner");
banner.all = function(req, res, next){
    bannerModel.find(function(err, banners){
        console.log(banners);
        res.render('backend/banner/banners', {title: "Banners", banners:banners});
    })
}

banner.add = function(req, res, next){
    res.render('backend/banner/add-banner', {title: "Add New Banner"});
}

banner.addPost = function (req, res, next) {
    errors = [];
    let title = req.body.title;
    let description = req.body.description;
    let image = req.files.image;
    let filename = typeof image !== "undefined" ? image.name : '';
    let order = req.body.order;
    //console.log(image);
    req.checkBody('title', 'Please enter a banner title').notEmpty(); 
    req.checkBody('image', 'Please upload an image Jpeg, Png or Gif').isImage(filename);
   
    var errors = req.validationErrors();
    if (!errors){
        const uploadpath = 'public/uploads/' + filename;
        console.log(uploadpath)
        image.mv(uploadpath, function (err, uploadData) {
            if (err) throw err;
            if (uploadData) {
                console.log('Image has been sucessfully uploded!');
            }
        })
        //console.log(title + ' ' + description + ' ' + image.name);
        let banner = new bannerModel({
            title: title,
            image: filename,
            description: description,
            order: order,
            status: 1 
        });
        banner.save(function(err, banner) {
            if (err) throw err;
            if (banner){
                req.flash('success', [{msg : "Banner added successfully!"}]);
                res.redirect('/admin/banners');
            }
        });
    }else{
        req.flash('errors', errors);
        res.redirect("/admin/banner/add");
    }
    
}

banner.edit = function(req, res, next){
    let id = req.params.id;
    let banner = bannerModel.findById(id, function(err, banner){
        if(err) throw err;
        if(banner){
            console.log(banner);
            res.render('backend/banner/edit-banner', {title: "Edit Banner", banner:banner});
        } 
    })
}
banner.editPost = function(req, res, next){
    
    errors = [];
    let title = req.body.title;
    let description = req.body.description;
    let image = req.files.image;
    let filename = typeof image !== "undefined" ? image.name : '';
    let order = req.body.order;
    let id = req.body.id;
    //console.log(image);
    req.checkBody('title', 'Please enter a banner title').notEmpty(); 
    //req.checkBody('image', 'Please upload an image Jpeg, Png or Gif').isImage(filename);

    console.log(filename);

   
    var errors = req.validationErrors();
    if (!errors){

        if(filename !=''){
            const uploadpath = 'public/uploads/' + filename;
            image.mv(uploadpath, function (err, uploadData) {
                if (err) throw err;
                if (uploadData) {
                    console.log('Image has been sucessfully uploded!');
                }
            })
            //console.log(title + ' ' + description + ' ' + image.name);
            var banner = {
                title: title,
                image: filename,
                description: description,
                order: order,
                status: 1 
            };
        }else{
            var banner = {
                title: title,
                description: description,
                order: order,
                status: 1 
            };
        }
        
        bannerModel.findByIdAndUpdate(id, banner, function(err, banner){
            if(err) throw err;
            if(banner){
                req.flash('success', [{msg: "Banner edit successfully."}]);
                res.redirect('/admin/banner/edit/'+id);
            }
        })
    }else{
        req.flash('errors', errors);
        res.redirect("/admin/banner/edit/"+id);
    }
   


}

banner.delete = function(req, res, next){
    let id = req.params.id;

    bannerModel.findByIdAndRemove(id, function(err, banner){
        if(err) throw err;
        if(banner){
            req.flash("success", [{msg:"Banner deleted successfully."}]);
            res.redirect('/admin/banners');
        }
    })
}

module.exports = banner;