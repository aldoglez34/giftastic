this.onload = function () {

    $("#sectionforgifs").hide();

    $("#movieinfocontainer").hide();

};

$(document.body).on("click", ".showGIF", function () {

    $("#sectionforgifs").show(500);

    $("#gifscontainer").empty();

    // set up variables
    var animal = $(this).text();
    var key = "FlafZVuLA5Y0nJLXJGgJuyOBK5Q7ntpj";

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=" + key + "&limit=10";

    // ajax call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response);

        var results = response.data;

        for (var i = 0; i < results.length; i++) {

            var gifdiv = $("<div>");
            var p = $("<p>");
            var gif = $("<img>");

            p.text("Rating: " + results[i].rating);

            // add attributes to the gif
            gif.attr("src", results[i].images["480w_still"].url);
            gif.attr("state", "still");
            gif.attr("src-still", results[i].images["480w_still"].url);
            gif.attr("src-moving", results[i].images.fixed_height.url);
            gif.attr("height", "200");
            gif.attr("width", "200");
            gif.attr("class", "playgif");

            // appending
            gifdiv.append(p);
            gifdiv.append(gif);

            gifdiv.attr("class", "mb-4 border border-primary rounded");

            $("#gifscontainer").prepend(gifdiv);
        }
    });
});

function searchMovieInfo(queryInfoURL) {

    $.ajax({
        url: queryInfoURL,
        method: "GET"
    }).then(function (response) {

        // console.log(response);

        $("#m_title").text("Title: " + response.Title);
        $("#m_year").text("Year: " + response.Year);
        $("#m_director").text("Director: " + response.Director);
        $("#m_actors").text("Actors: " + response.Actors);
        $("#m_metascore").text("Metascore: " + response.Metascore);
        $("#m_boxoffice").text("BoxOffice: " + response.BoxOffice);
        $("#m_plot").text("Plot: " + response.Plot);

    });
};

function searchMovieGIFs(queryGIFsURL) {

    $.ajax({
        url: queryGIFsURL,
        method: "GET"
    }).then(function (response) {

        console.log(response);

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
        alert("Type a movie first");
    }
    else {

        var movie = $("#movieTitle").val().trim();

        // setup vars to call the omdb api
        var queryInfoURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=623cac65";
        searchMovieInfo(queryInfoURL);

        // setup vars to call the giphy api
        // query will be limited to 3 gifs
        var queryGIFsURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=FlafZVuLA5Y0nJLXJGgJuyOBK5Q7ntpj&limit=4";
        searchMovieGIFs(queryGIFsURL);

        $("#movieinfocontainer").show(500);

        $("#movieTitle").val("");

    }

});

$("#addchar").on("click", function () {

    if ($("#newchar").val().trim() != "") {

        var char = $("#newchar").val().trim();

        var b = $("<button>");
        b.attr("type", "button");
        b.attr("class", "btn mb-2 btn-dark showGIF");
        b.text(char);

        $("#buttoncontainer").append(b);

        console.log(char);
    }

    $("#newchar").val("");
});

