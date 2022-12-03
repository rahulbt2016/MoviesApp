$( document ).ready(function() {

    $("#perPageSelect").change(function(){

        let urlString = window.location.href;
        let perPage = $(this).val();

        let url = new URL(urlString);
        let params = url.searchParams;

        params.set('perPage', perPage);

        if(urlString.indexOf('page')!= -1){
            params.set('page', 0);
        }

        let new_url = url.toString();

        window.location.replace(new_url);

    });

    $("#title-search-btn").click(function() {

        let urlString = window.location.href;
        let title = $("#title").val();

        let url = new URL(urlString);
        let params = url.searchParams;

        params.set('title', title);

        if(urlString.indexOf('page')!= -1){
            params.set('page', 0);
        }

        let new_url = url.toString();

        window.location.replace(new_url);
    });

    $("#pageSelect").change(function(){

        let urlString = window.location.href;
        let page = $(this).val();

        let url = new URL(urlString);
        let params = url.searchParams;

        params.set('page', page);

        let new_url = url.toString();

        window.location.replace(new_url);

    });

    $("#add-movie-btn").click(function() {
        window.location.replace("/addMovie");
    });

    $(".delete-movie-btn").click(function() {
        if(confirm("Delete movie?")) {

            let movie_id = $(this).children("p").html()
            
            $.ajax({
                url: '/api/movies/' + movie_id,
                type: 'DELETE',
                success: function(result) {
                    alert("Movie deleted successfully!");
                    location.reload();
                }
            });
        }
    });

    $(".update-movie-btn").click(function() {
        
    });

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

     $("#add-movie-form-btn").click(function(){
        
        if(confirm("Add movie?")) {

            $.ajax({
                url: '/api/movies/',
                type: 'POST',
                data: {
                    title : $("[name='title']").val(),
                    countries : $("[name='countries']").val().toString()
                },
                success: function(result) {
                    alert("Movie added successfully!");
                    window.location.replace("/");
                }
            });
        }

     });

});