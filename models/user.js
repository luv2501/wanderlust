const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose=require("passport-local-mongoose").default;
const userSchema=new Schema({
    username:String,
    email:{
        type:String,
        required: true,
    }
});// passport local mongoose will add username and password fields automatically 
userSchema.plugin(passportLocalMongoose,{usernameField:'email'});
module.exports = mongoose.model("User",userSchema);