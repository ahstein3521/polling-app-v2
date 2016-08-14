var mongoose=require('mongoose');
var Schema=mongoose.Schema;

function caps(str){
	return str.charAt(0).toUpperCase()+str.substr(1);
}

function formatTitle(str){
  	str=str.trim();
  	return str.split(" ").map(function(val){
  		return caps(val);
  	}).join(" ");
}

function formatOptions(str){
	var obj={};
	var arr=str.split("\r\n").map(function(val){
			return formatTitle(val);
		})
	 arr.forEach(function(val){
		obj[val]={name:val, votes:0}
	})
	 return obj;
}

var voteSchema = new Schema({
	title:{type:String, set:formatTitle},
	options:{type:Object,set:formatOptions},
	author:String,
	voters:Array
});


module.exports= mongoose.model('votes', voteSchema);