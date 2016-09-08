var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var optionSchema=new Schema({
	name:String,votes:{type:Number,default:0}
})

var Option=mongoose.model("Option",optionSchema);

var voteSchema = new Schema({
	title:String,
	author:String,
	options:[optionSchema],
	voters:[{type:String}]
});

voteSchema.statics.createNew=function(options,title,author,callback){
	var optionsArray=[];
	var Vote=this.model("votes");
	
	options.forEach(function(opt){
		if(opt!="") optionsArray.push({name:opt})
	})
	
	Option.create(optionsArray).then(function(options){
		Vote.create({title:title,author:author,options:options},callback);
	})
}

voteSchema.statics.findOneAndCheck=function(id,user,cb){
	this.model("votes").findOne({"_id":id},function(err,doc){
		var flag=doc.voters.indexOf(user)!=-1;
		return cb(err,doc,flag);
	})
}

voteSchema.statics.submitNewOption=function(option,id,user,cb){
	var Vote=this.model("votes");
		Vote.findByIdAndUpdate({_id:id},{$push:{"options":option,"voters":user}},{safe: true, upsert: true, new : true},cb)
	
}

voteSchema.statics.submit=function(id,user,cb){
	this.model("votes").findOne({"options._id":id},function(err,doc){
		var option=doc.options.id(id);
		option.votes++;
		doc.voters.push(user);
		
		doc.save(cb);
	})
}

module.exports= mongoose.model('votes', voteSchema);