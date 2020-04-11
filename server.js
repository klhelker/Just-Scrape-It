var express = require("express");
var logger = require("morgan")
var mongoose = require("mongoose")


var cheerio = require("cheerio");
var axios = require("axios")

var db = require("./models")

var PORT = 3000; 

var app = express();

app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

app.get("/scrape", function(req, res) {
    // First, we grab the body of the html with axios
    axios.get("http://modernmag.com").then(function(response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);
      
  
      // Now, we grab every h2 within an article tag, and do the following:
      $(".infinite-post").each(function(i, element) {
        // Save an empty result object
       

        var title = $(element).children().find("h2").text()

        var body = $(element).children().find("p").text()

        var link = $(element).find("a").attr("href")

        console.log(link)

       db.Article.insert({
          title: title,
          summary: body,
          link: link
        },
        function(err, inserted) {
          if (err) {
            // Log the error if one is encountered during the query
            console.log(err);
          }
          else {
            // Otherwise, log the inserted data
            console.log(inserted);
          }
        });


      });
  
        // Add the text and href of every link, and save them as properties of the result object
        // response.title = $(this)
        //   .children("a")
        //   .text();
        // response.link = $(this)
        //   .children("a")
        //   .attr("href");
  
      //   // Create a new Article using the `result` object built from scraping
      //   db.Article.create(result)
      //     .then(function(dbArticle) {
      //       // View the added result in the console
      //       console.log(dbArticle);
      //     })
      //     .catch(function(err) {
      //       // If an error occurred, log it
      //       console.log(err);
      //     });
      // });
  
      // Send a message to the client
      res.send("Scrape Complete");
    });
  });
  app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });