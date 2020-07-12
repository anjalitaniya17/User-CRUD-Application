var mongoose = require('mongoose');

var userSchema=new mongoose.Schema({
    name:String,
    email:String,
    age:Number
});

module.exports= mongoose.model("User",userSchema);

