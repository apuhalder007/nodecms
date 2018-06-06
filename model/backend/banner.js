const mongoose = require("mongoose");
const config = require('../../utilities/config');
mongoose.connect(config.dbUrl);
const Schema = mongoose.Schema;
let bannerSchema = new Schema({
    title:{type: String},
    image:{type: String},
    description:{type: String},
    order : {type: Number, default: 0},
    status : {type: Number, default: 1},
    createDate:{ type: Date, default: Date.now }
});

let bannerModel = mongoose.model('banners', bannerSchema);

module.exports = bannerModel;