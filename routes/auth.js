module.exports=function(app){
	var passport=require("passport");
	
	app.get('/auth', passport.authenticate('github'));
	
	app.get('/auth/error', function(req,res){
		res.redirect("/error")
	});
	
	app.get('/auth/callback',
		passport.authenticate('github', {failureRedirect: '/auth/error'}),
  		function(req,res){
  			req.session.user=req.user.user;
  			res.redirect("/")
  		}
  	);
  	app.get("/logout",function(req,res){
  		req.logOut();
  		res.redirect("/")
  	})
}