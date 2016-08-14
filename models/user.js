var mongoose=require('mongoose');
var Schema=mongoose.Schema;


var userSchema = new Schema({user:Object});


module.exports= mongoose.model('user', userSchema);