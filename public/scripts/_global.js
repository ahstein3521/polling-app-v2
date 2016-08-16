
String.prototype.titleCase=function(){
    return this.split(" ").map(function(v,i){
        return v.charAt(0).toUpperCase()+v.substr(1);
    }).join(" ");
}

String.prototype.replaceAll = function(a, b) {
    var regex=new RegExp(a,'g');
    return this.replace(regex, b);
};//http://stackoverflow.com/questions/1144783/replacing-all-occurrences-of-a-string-in-javascript