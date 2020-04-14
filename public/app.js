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

      var info = $("<div>").text(results[i].title)
      $("#articles").append(info)

    }
  }
})



