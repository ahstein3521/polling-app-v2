var mongoose=require('mongoose');
var Schema=mongoose.Schema;


var userSchema = new Schema({
    photo:String,
    id:String,
    github_refreshToken:String,
    github_accessToken:String,
    username:String,
    url:String
});


module.exports= mongoose.model('user', userSchema);