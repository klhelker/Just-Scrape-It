$("#scrapeBtn").on("click",function() {
    $.get("/scrape", function(data, status){
        console.log(status);
      });
});

$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append("<p data-id='" + data[i].title + "'>" + data[i].summary + "<br />" + data[i].link + "</p>");
  }
});