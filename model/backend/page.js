const mongoose = require("mongoose");
const config = require('../../utilities/config');
mongoose.connect(config.dbUrl);
const Schema = mongoose.Schema;
let pageSchema = new Schema({
    title:{type: String},
    slug: { type: String },
    content:{type: String},
    order : {type: Number, default: 0},
    status : {type: Number, default: 1},
    createDate:{ type: Date, default: Date.now }
});

let pageModel = mongoose.model('pages', pageSchema);

module.exports = pageModel;