$("#scrapeBtn").on("click",function() {
    $.get("/scrape", function(data, status){
        console.log(status);
      });
});

