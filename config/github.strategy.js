var passport = require('passport');
var GithubStrategy = require('passport-github').Strategy;
var User=require('../models/user');

module.exports = function(){
    passport.use(new GithubStrategy({
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret,
      callbackURL: process.env.callbackURL
    },
    function(accessToken,refreshToken, profile, done){
            
            User.findOne({'id': profile.id}, function (error, user) {
                if (user) {
                    done(null, user);
                }
                else{
                    var newUser = new User({
                        photo:profile.photos[0].value,
                        id:profile.id,
                        github_refreshToken:refreshToken,
                        github_accessToken:accessToken,
                        username:profile.username,
                        url:profile.profileUrl
                    })
                    newUser.save();
                    done(null, newUser);
                }
            })
        })
    )   
}

