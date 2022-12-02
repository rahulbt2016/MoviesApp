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

});