// load mongoose since we need it to define a model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
UserSchema = new Schema({
    name: "String",
    email: "String",
    password: "String"
});

module.exports = mongoose.model('User', UserSchema);