const mongoose = require("mongoose");
const config = require('../../utilities/config');
mongoose.connect(config.dbUrl);
const Schema = mongoose.Schema;
let menuSchema = new Schema({
    title: { type: String },
    items: {type:Array},
    status: { type: Number, default: 1 },
    createDate: { type: Date, default: Date.now }
});

let menuModel = mongoose.model('menus', menuSchema);

module.exports = menuModel;