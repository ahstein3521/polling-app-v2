(function(){

    if(!$("#myChart").length) return;
	
    $.getJSON("/stream",function(data){
        
        if(!data.options){
            $(".chart").prepend("<a href='/'><h3>Error loading chart.</h3></a>");
            return;
        }
		
        var votes=[],labels=[];

		data.options.forEach(function(v){
			votes.push(v.votes);
			labels.push(v.name);
		})

		var ctx = document.getElementById("myChart").getContext("2d");	
		var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels:labels,
                datasets: [{data: votes,backgroundColor:'#ff986d',label:"# of votes"}]
                }
            });	
        })
})()

