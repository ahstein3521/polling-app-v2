var Votes=require("../models/votes");

module.exports=function(app){
	app.use(function(req,res,next){
		if(!req.user||!req.session.user){
			req.session.user=req.clientIp
		}
		next();
	})	
	app.get("/",function(req,res,next){	
		var user=req.user? req.session.user : null;
		Votes.find({},"title",function(err,data){
			if(err) return next(err);
			
			return res.render("home",{title:"Home",user:user, ballot:data});	
		})	
	})
	
	app.get("/dashboard",function(req,res,next){
		// if(!req.user) return res.redirect("/")
		// var query={author:req.session.user.username};
		
		Votes.find({},function(error,data){
			if(error) return next(error);
			
			res.render("dashboard",{ballots:data,user:req.session.user});
		})
	})
}

