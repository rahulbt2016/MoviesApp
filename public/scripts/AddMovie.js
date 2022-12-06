$(document).ready(function(){
    
    var multipleCancelButton = new Choices('#choices-multiple-remove-button', {
       removeItemButton: true,
       maxItemCount:10,
       searchResultLimit:10,
       renderChoiceLimit:10
     }); 

     var now = new Date();
 
     var day = ("0" + now.getDate()).slice(-2);
     var month = ("0" + (now.getMonth() + 1)).slice(-2);
 
     var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
 
 
    $('#date').val(today); 
    $('#date1').val(today); 
    $('#date2').val(today); 
    $('#date3').val(today); 
    
    
});
