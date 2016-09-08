var Vote=require("../models/votes");

module.exports=function(app){
  
  app.get("/vote",function(req,res,next){
    var user=req.user? req.user._id : req.clientIp;

    Vote.findOneAndCheck(req.query.id,user,function(err,data,submitted){
      if(err) return next(err);
      req.session.vote=data;
      res.render("vote",{ballot:data,user:req.user,submitted:submitted});
    })
  })

  app.get("/results",function(req,res){
    if(!req.session.vote) return res.redirect("/");
    res.render("vote",{ballot:req.session.vote,user:req.user,submitted:true});

  })

  app.get("/stream",function(req,res){
    res.send(req.session.vote);
  })//Endpoint for client to load vote data to the canvas chart. 


  app.post("/vote/new",function(req,res,next){
    Vote.createNew(req.body.options.trim().split("\r\n"),req.body.title,req.user.username,function(err,data){
      if(err) return next(err);
      res.redirect("/");
    })
  })
    
  app.put("/vote/:id",function(req,res,next){
    var user=req.user? req.user._id : req.clientIp

    if(!req.body.option && !req.body.newOption|| req.body.newOption&&req.body.newOption.trim().length==0) return res.send("Cannot submit an empty form");

    if(req.body.newOption){

      Vote.submitNewOption({name:req.body.newOption,votes:1},req.params.id,user,function(err,data){
        if(err) return next(err);
        req.session.vote=data;
        return res.redirect(303,"/results");      
      }) 
    }else{

      Vote.submit(req.body.option, user,function(err,data){
        if(err) return next(err);

        res.redirect(303,"/vote?id="+req.params.id);
      })
    }
  })
  
  app.delete("/vote",function(req,res,next){
    
	  Vote.findByIdAndRemove(req.query.id, function(err) {
	    if(err) return res.status(500).send(error);
	    
	    res.redirect(303,"/dashboard");
	  });
	});    	
}
