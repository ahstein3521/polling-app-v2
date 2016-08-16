var Votes=require("../models/votes");
var seed=require("./seed.js")

module.exports=function(app){
	app.use(function(req,res,next){
		if(!req.user||!req.session.user){
			req.session.user=req.clientIp
		}
		next();
	})	
	// app.get("/remove",function(req,res){
	// 	Votes.remove({},function(e,d){
	// 		console.log(d)
	// 		res.redirect("/")
	// 	})
	// })
	// // app.get("/seed",function(req,res,next){
		
	// // 	seed.forEach(function(v,i){
	// // 		var vote=new Votes();
	// // 		vote.options=v.options;
	// // 		vote.title=v.title;
	// // 		vote.voters=[];
	// // 		vote.author=v.author;
	// // 		vote.save();	
	// // 	})

	// // 	res.redirect("/")
	// // })
	app.get("/",function(req,res,next){	
		var user=req.user? req.session.user : null;
		Votes.find({},"title",function(err,data){
			if(err) return next(err);
			
			return res.render("home",{title:"Home",user:user, ballot:data});	
		})	
	})
	
	app.get("/dashboard",function(req,res,next){
		if(!req.user) return res.redirect("/")
		var query={author:req.session.user.username};
		
		Votes.find(query,function(error,data){
			if(error) return next(error);
			
			res.render("dashboard",{ballots:data,user:req.session.user});
		})
	})
}

