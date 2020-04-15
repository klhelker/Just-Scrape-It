$("#scrapeBtn").on("click",function() {
    $.get("/scrape", function(data, status){
        console.log(status);
      });
});

$.get("/api/articles", function(results){


  console.log("get route initiated")
  console.log(results);

  if (results){
    $("#warning").empty()
    for(var i = 0; i < results.length; i++){

      var info = $("<div>").html("<p><br>" + results[i].title + "</br><br>" + results[i].summary + "</br><br>" +"<a href>" + results[i].link + "</a>" + "</p>")
      $("#articles").append(info)
      $("#articles").append("<button id=save>Save</button>")
    }
  }
}) 

$(document).on("click", "#clear", function() {
  // Empty the notes from the note section
  $("#articles").empty();
})
