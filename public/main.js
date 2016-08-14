var newOption="";
var alt_input_default_html="<div class='radio alt-option'>"+$('.alt-option').html()+"</div>";
var add_option_button_html="<button class='add-option' onclick='updateOptionList()'>Add</button>";

String.prototype.titleCase=function(){
    return this.split(" ").map(function(v,i){
        return v.charAt(0).toUpperCase()+v.substr(1);
    }).join(" ");
}

String.prototype.replaceAll = function(a, b) {
    var regex=new RegExp(a,'g');
    return this.replace(regex, b);
};//http://stackoverflow.com/questions/1144783/replacing-all-occurrences-of-a-string-in-javascript


$("input[type='radio']").on("click",function(){
    var label=$(this).parent().text().trim();

    if(label!=$(this).val()){
        $(this).val(label.replaceAll(" ","-"));
    }
})//values can only be one word, so make options consisting of more than one word have a hyphenated value to represent the option accurately

$(document).on("click",".alt-option input[type='radio']",function(){
    var input="<input type='text' value=''>"+add_option_button_html;
    $(this).parent().parent().html(input).removeClass("radio");
})

$(document).on("keyup","input[type='text']",function(e){
    newOption=$.trim($(this).val());
})

function updateOptionList(){
    var newLabel=newOption.titleCase().replaceAll(" ","-");
    var radioInput="<label><input type='radio' name='option' value='"+newLabel+"'>"+newOption+"</label>"
    var submitButtonHTML="<div class='form-btn'>"+$(".form-btn").html()+"</div>";

    $(".form-btn").hide();
    $(".alt-option").html(radioInput).addClass("radio").removeClass("alt-option");
    $(".ballot").append(alt_input_default_html+submitButtonHTML);
    
}

function submitVote(){
	var data=$("input:checked").val();
	
    if(!data) return;	
    
    $.ajax({
  		url: "/vote",
  	   type: 'PUT',
  	   data: {vote: data.replaceAll("-"," ")},
  		success: function(data) {console.log(data.message);},
        failure:function(data){console.log(data);}
	})
}

function handleDelete(target,url){
    if(confirm("Are you sure you want to permanently delete this ballot")){
        $(target).parent().hide();
        $.ajax({
            url:"/vote?id="+url,
           type:"DELETE",
        success:function(data){console.log(data.message);},
        failure:function(data){console.log(data);}
        })
    }
}

$(document).ready(function(){
	if($("#myChart").length){
		loadChart();
	}
})


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

function loadChart(){
	$.getJSON("/stream",function(data){
		var options=Object.keys(data.options);
		var ctx = document.getElementById("myChart").getContext("2d");	
		var myChart = new Chart(ctx, {
            type: 'bar',
           
            data: {
                labels:options,
                datasets: [{data: options.map(function(v){ return data.options[v].votes}),
                        backgroundColor:getColorArray(options.length),
                             label:"# of votes"
                    }]
                }
        });	
    })
}

	
    



