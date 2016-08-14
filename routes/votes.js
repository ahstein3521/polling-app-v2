var Vote=require("../models/votes");


module.exports=function(app){
	app.get("/vote",function(req,res,next){
		var user=req.session.user
		var flag=false;//var for whether or not a vote was submitted under username and/or ip

		if(user.username) user=user.username;

		Vote.findOne({_id:req.query.id},function(err,data){
			if(err) return next(err);
			req.session.vote=data;

			if(data.voters.filter(function(v){return v==user}).length!=0) flag=true;		
	 		
			return res.render("vote",{ballot:data,user:req.session.user,submitted:flag})  
		})
    })

	app.get("/submitted",function(req,res,next){
			var vote=req.session.vote;
			var key=req.query.option.split("-").join(" ");
			var options=vote.options;
			var count=options.hasOwnProperty(key)? options[key].votes+=1 : 1;
			
			vote.options[key]={name:key,votes:count}
			
			return res.render("vote",{user:req.session.user,ballot:vote,submitted:true,})
    })    
	
	app.get("/stream",function(req,res){
		// Vote.remove({},function(e,d){console.log("penis")})
		res.json(req.session.vote)
	})
    
    app.post("/vote/new",function(req,res,next){
    	var vote=new Vote();
    		
    		vote.options=req.body.options;
    		vote.title=req.body.title;
    		vote.author=req.user.user.username;
    		vote.voters=[];

    		vote.save();
    	
    	res.redirect("/")
    })
    
    app.put("/vote",function(req,res,next){
   		var vote=req.session.vote;
   		var user=req.session.user;
   		var key=req.body.vote;
   		var options=vote.options;
   		var count=options.hasOwnProperty(key)? options[key].votes+=1 : 1;
   		
   		if(user.username) user=user.username
   		

   		vote.options[key]={name:key,votes:count}
   		vote.voters.push(user);
   		
   		Vote.findByIdAndUpdate({_id:vote._id}, vote, {new:true},function(err,data){
   			if(err) return res.status(500).send(err);
   			res.json({message:"Submitted"})	
   		})
    })
    app.delete("/vote",function(req,res,next){
    
	  Vote.findByIdAndRemove(req.query.id, function(err) {
	    if (err) {
	      return res.status(500).send(error);
	    }
	    res.json({ message: 'Ballot Deleted' });
	  });
	});    	
}
  
