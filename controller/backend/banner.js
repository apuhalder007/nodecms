let banner = {};
let bannerModel = require("../../model/backend/banner");
banner.all = function(req, res, next){
    bannerModel.find(function(err, banners){
        res.render('backend/banner/banners', {title: "Banners", banners:banners});
    })
}

banner.add = function(req, res, next){
    res.render('backend/banner/add-banner', {title: "Add New Banner"});
}

module.exports = banner;