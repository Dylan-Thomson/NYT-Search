$(document).ready(function() {
    $("#search-btn").on("click", function(event) {
        event.preventDefault();
        getNYTData();
    });

    $("#clear-btn").on("click", function() {
        $("#result").empty();
    });

    function getNYTData() {
        var searchTerm = $("#search-value").val();
        var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=c470f5802d304587810c6542ece0329d&q=" + searchTerm;

        var startDate = $("#start-date").val();
        var endDate = $("#end-date").val();
        if(startDate) {
            startDate = startDate.split("-").join("");
            queryURL += "&begin_date=" + startDate;
        }
        if (endDate) {
            endDate = endDate.split("-").join("");
            queryURL += "&end_date=" + endDate;
        }

        // queryURL += "&sort=" + $("#sort-by").val();
        queryURL += "&sort=newest";

        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            displayArticles(response.response.docs);
            
        });
    }
    
    function displayArticles(articles) {
        for(var i = 0; i < $("#number-records").val(); i++) {
            console.log(articles[i].headline.main);
            var div = $("<div>");
            var anchor = $("<a>");
            anchor.text(articles[i].headline.main);
            anchor.attr("href", articles[i].web_url);
            var h3 = $("<h3>");
            h3.append(anchor);
            div.append(h3);
            if(articles[i].document_type === "article") {
                div.append($("<div>").text("Date published: " + articles[i].pub_date.substring(0,10)));
                div.append($("<div>").text(articles[i].byline.original));
            }
            if(articles[i].document_type === "topic") {
                div.append($("<div>").text(articles[i].snippet));
            }
            $("#result").prepend(div);
        }
    }

});
