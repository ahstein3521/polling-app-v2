

function ajaxResponse(data){
  console.log(data.message);
}

function ajaxCall(type,url,data){
    $.ajax({
        url:"/vote?id="+url,
       type:type,
       data:data,
      success:ajaxResponse,
      failure:ajaxResponse
  })
}


$(".form-btn input").on("click",function(){
	var checkedInput=$("input[type='radio']:checked").val();
	  
    ajaxCall("PUT","",{vote:checkedInput.replaceAll("-"," ")})
})

function handleDelete(target,url){
    var message="Are you sure you want to permanently delete this ballot";
    if(confirm(message)){
        $(target).parent().hide();
        ajaxCall("DELETE",url,null);
    }
}