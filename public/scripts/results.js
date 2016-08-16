$(document).ready(function(){
	

    function getColorArray(quantity){
        var colors=['#ff986d', '#f47361', '#e35056', '#cb2f44', '#ae112a', '#8b0000'];
        var res=[];
        var index=0;

        while(res.length<=quantity){

            if(index>=colors.length) index=0;

            res.push(colors[index]);
            index++;
        }
        return res;
    }

    (function(){

        if(!$("#myChart").length) return;
    	
        $.getJSON("/stream",function(data){
            
            if(!data.options){
                $(".chart").prepend("<a href='/'><h3>Error loading chart.</h3></a>");
                return;
            }
    		
            var options=Object.keys(data.options);
    		var ctx = document.getElementById("myChart").getContext("2d");	
    		var myChart = new Chart(ctx, {
                type: 'bar',
               
                data: {
                    labels:options,
                    datasets: [{data: options.map(function(v){ return data.options[v].votes}),
                            backgroundColor:getColorArray(options.length),
                                 label:"# of votes"}]
                    }
                });	
            })
    })()
})

