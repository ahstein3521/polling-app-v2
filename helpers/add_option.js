module.exports=function(req,isPutRequest){
	var vote=req.session.vote;
	var options=vote.options;
	var user=req.session.user;
	var key, count;

	if(isPutRequest){
		key=req.body.vote;
	}else{
		key=req.query.option.split("-").join(" ");
	}

	count=options.hasOwnProperty(key)? options[key].votes+=1 : 1;

	if(isPutRequest && user.username){
		user=user.username;
		vote.voters.push(user);
	}

	vote.options[key]={name:key,votes:count}

	return vote;
}