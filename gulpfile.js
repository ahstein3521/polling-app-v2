var gulp=require("gulp");
var concat = require('gulp-concat');
var uglify= require("gulp-uglify");

gulp.task("scripts",function(){
	return gulp.src(["public/scripts/_global.js","public/scripts/*.js"])
	
	.pipe(uglify()) //running this function after concat messes up file order although that order makes more logical sense
	.pipe(concat("main.js"))
	.pipe(gulp.dest("public/dist"))

})
