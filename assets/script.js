$(document).ready(function() {
    $("#search").on("click", function(event) {
        event.preventDefault();
        console.log("hi");
        getNYTData($("#search-value").val());
    });
    function getNYTData(searchValue) {
        var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=c470f5802d304587810c6542ece0329d&q=" + searchValue;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            console.log(response.response.docs);


            var articleArray = response.response.docs;

            articleArray.forEach(function(article) {
                var div = $("<div>");
                var anchor = $("<a>");
                anchor.text(article.headline.main);
                anchor.attr("href", article.web_url);
                var h3 = $("<h3>");
                h3.append(anchor);

                div.append(h3);
                div.append($("<div>").text("Date published: " + article.pub_date.substring(0,10)));
                div.append($("<div>").text(article.byline.original));
                $("#result").prepend(div);
            });

        });
    }

});


// getNYTData("misty copeland");