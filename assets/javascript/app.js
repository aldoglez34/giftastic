this.onload = function () {

    $("#sectionforgifs").hide();

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