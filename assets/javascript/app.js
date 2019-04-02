this.onload = function () {

    $("#movieinfocontainer").hide();
    $("#addtofavoritesbttn").hide();

    // updates the favorites list
    var x = localStorage.getItem("0")
    if (x != 0) {
        for (var i = 1; i <= x; i++) {

            var a = $("<a>");
            a.attr("class", "dropdown-item searchfromdropdown");
            a.text(localStorage.getItem(i));

            $("#favslist").prepend(a);
        }
    }

};

// global variables that hold the title of the movie being searched
var movietitle;

function searchMovieInfo(queryInfoURL) {

    $.ajax({
        url: queryInfoURL,
        method: "GET"
    }).then(function (response) {

        if (response.Response === "False") {
            alert("Movie doesn't exist in the database");
        }
        else {

            // update html
            $("#m_title").text("Title: " + response.Title);
            $("#m_year").text("Year: " + response.Year);
            $("#m_director").text("Director: " + response.Director);
            $("#m_actors").text("Actors: " + response.Actors);
            $("#m_metascore").text("Metascore: " + response.Metascore);
            $("#m_boxoffice").text("BoxOffice: " + response.BoxOffice);
            $("#m_plot").text("Plot: " + response.Plot);

            // update add to favorites button
            $("#addtofavoritesbttn").text("Add '" + response.Title + "' to my favorites");

            // update the global variable with the movie title
            movietitle = response.Title;

            // show container with the movie info
            $("#movieinfocontainer").show(500);
        }

    });
};

function searchMovieGIFs(queryGIFsURL) {

    $.ajax({
        url: queryGIFsURL,
        method: "GET"
    }).then(function (response) {

        // console.log(response);

        for (var i = 0; i < response.data.length; i++) {

            var gif = $("#gif" + i);

            // add attributes to the gif
            gif.attr("src", response.data[i].images["480w_still"].url);
            gif.attr("state", "still");
            gif.attr("src-still", response.data[i].images["480w_still"].url);
            gif.attr("src-moving", response.data[i].images.fixed_height.url);
            gif.attr("height", "200");
            gif.attr("width", "200");

            // add the play gif class so you can "pause" the gifs by clicking them
            gif.attr("class", "playgif");

        }
    });
}

$(document.body).on("click", ".playgif", function () {

    var gifstate = $(this).attr("state");

    if (gifstate === "still") {
        $(this).attr("src", $(this).attr("src-moving"));
        $(this).attr("state", "moving");
    }

    if (gifstate === "moving") {
        $(this).attr("src", $(this).attr("src-still"));
        $(this).attr("state", "still");
    }

});

$("#searchbttn").on("click", function () {

    if ($("#movieTitle").val().trim() === "") {
        // alert("Type a movie first");
    }
    else {

        var movie = $("#movieTitle").val().trim();

        // setup vars to call the omdb api
        var queryInfoURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=623cac65";

        searchMovieInfo(queryInfoURL);

        // setup vars to call the giphy api
        // query will be limited to 3 gifs
        var queryGIFsURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=FlafZVuLA5Y0nJLXJGgJuyOBK5Q7ntpj&limit=8";
        searchMovieGIFs(queryGIFsURL);

    }

    $("#addtofavoritesbttn").show(500);

});

$("#playallgifs").on("click", function () {

    // iterate the total amout of gifs
    for (var i = 0; i < 8; i++) {

        $("#gif" + i).attr("src", $("#gif" + i).attr("src-moving"));
        $("#gif" + i).attr("state", "moving");

    }

});

$("#addtofavoritesbttn").on("click", function () {

    // check if the movie IS in the list already
    var cansave = true;
    var x = localStorage.getItem("0")
    if (x != 0) {
        for (var i = 1; i <= x; i++) {

            if (movietitle === localStorage.getItem(i)) {
                cansave = false;
                alert(localStorage.getItem(i) + " is already in your favorites list")
            }

        }
    }

    if (cansave) {
        // get the value in position 0
        // ! this value now holds the amount of favorite movies
        var mcounter = localStorage.getItem("0");

        // storages movie title in the position 0 of the local storage
        localStorage.setItem(parseInt(mcounter) + 1, movietitle);

        // updates the position 0 on the local storage
        localStorage.setItem("0", parseInt(mcounter) + 1);

        addnewfavorite();
    }

});

$("#clearfavorites").on("click", function () {

    localStorage.clear();
    localStorage.setItem("0", 0);

    $("#favslist").html("");

});

function addnewfavorite() {

    var a = $("<a>");
    a.attr("class", "dropdown-item searchfromdropdown");
    a.text(movietitle);

    $("#favslist").prepend(a);

}

$(document.body).on("click", ".searchfromdropdown", function () {

    var movie = $(this).text();

    console.log(movie);

    // setup vars to call the omdb api
    var queryInfoURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=623cac65";

    searchMovieInfo(queryInfoURL);

    // setup vars to call the giphy api
    // query will be limited to 3 gifs
    var queryGIFsURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=FlafZVuLA5Y0nJLXJGgJuyOBK5Q7ntpj&limit=8";
    searchMovieGIFs(queryGIFsURL);

    $("#addtofavoritesbttn").show(500);

});
