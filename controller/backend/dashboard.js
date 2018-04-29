let dashboard = {};
dashboard.home = function(req, res, next){
    let username = req.session.user.username;
    res.render('backend/index', {title: "CMS Dashboard"});
}

module.exports = dashboard;