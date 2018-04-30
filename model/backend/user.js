const mongoose = require("mongoose");
const config = require('../../utilities/config');
mongoose.connect(config.dbUrl);
const Schema = mongoose.Schema;
let userSchema = new Schema({
    username:{type: String, unique: true},
    password:{type: String},
    email:{type: String, unique: true},
    role : {type:String, default: "guest"},
    createDate:{ type: Date, default: Date.now }
});

let userModel = mongoose.model('users', userSchema);

module.exports = userModel;