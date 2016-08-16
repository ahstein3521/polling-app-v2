var newOption="";
var altOptionHTML="<div class='radio alt-option'>"+$('.alt-option').html()+"</div>";
var buttonHTML="<button class='add-option' onclick='updateOptionList()'>Add</button>";


$("input[type='radio']").on("click",function(){
    var label=$(this).parent().text().trim();

    if(label!=$(this).val()){
        $(this).val(label.replaceAll(" ","-"));
    }
    
})//values can only be one word, so make options consisting of more than one word have a hyphenated value to represent the option accurately

$(document).on("click",".alt-option input[type='radio']",function(){
    var input="<input type='text' value=''>"+buttonHTML;
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
    $(".ballot").append(altOptionHTML+submitButtonHTML);
}