$(document.body).on("click", ".showGIF", function () {
    // set up variables
    var gotchar = $(this).text();
    console.log(gotchar);
    var key = "FlafZVuLA5Y0nJLXJGgJuyOBK5Q7ntpj";

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        gotchar + "&api_key=" + key + "&limit=10";
    console.log(queryURL);

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

            p.text("Rating: " + results[i].rating);

            var gif = $("<img>");

            gif.attr("src", results[i].images.fixed_height.url);

            gifdiv.append(p);

            gifdiv.append(gif);

            $("#gifscontainer").prepend(gifdiv);

        }

    });



});



$("#addchar").on("click", function () {

    var char = $("#newchar").val().trim();

    $("#newchar").val("");

    var b = $("<button>");
    b.attr("type", "button");
    b.attr("class", "btn mb-2 btn-dark showGIF");
    b.text(char);

    $("#buttoncontainer").append(b);

    console.log(char);

});