var Votes=require("../models/votes");

module.exports=function(app){

	app.get("/",function(req,res,next){	
		
		Votes.find({},"title",function(err,data){
			if(err) return next(err);
			return res.render("home",{title:"Home",user:req.user, ballot:data});	
		})	
	})
	app.get("/dashboard",function(req,res,next){
		if(!req.user) return res.redirect("/");
		
		Votes.find({author:req.user.username},function(error,data){
			if(error) return next(error);
			res.render("dashboard",{title:"Dashboard",ballots:data,user:req.user});
		})
	})
}

