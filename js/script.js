"use strict";

//1a) Listen for the select menu to change (watching value)
//1b) If the select value is an empty string, do nothing and return from this function immediately... can do with if statment//
//1c) Show a loader and clear out old stories
//2) Send a request to the NYT API for data based in the value of the select menu
//3) If successful, parse the data that we get back and decide what parts we want to append to our DOM
//4) Append that stuff to the DOM
//5) If unsuccessful, append and show a helpful error message to the user in the UI
//6) Hide the loader again
$(document).ready(function() {
  $(".loader").hide();
  $("#button").on("change", function(event) {
    event.preventDefault();
    let selection = $(this).val(); //make var const or let
    console.log(selection);
    let $body = $(".news");
    $("header").addClass("small-header");
    $(".loader").show();
    $.ajax({
      method: "GET",
      url:
        "https://api.nytimes.com/svc/topstories/v2/" +
        selection +
        ".json?api-key=o2AtApNsayCaLxZf88MW7z2YENOS7u1Q",
      datatype: "JSON"
    })
      .done(function(data) {
        $body.empty();
        console.log(data);
        const filtered = data.results.filter(function(value) { 
          return value.multimedia.length;
        }); 
        let articles = filtered.slice(0, 12); 
        $.each(articles, function(key, value) {
          let img = '<img src="' + value.multimedia[4].url + '">'; 
          let title = "<h2>" + value.title + "</h2>"; 
          let openingA = '<a href= "' + value.url + '">'; 
          $body.append("<article>" + openingA + img + title + "</a></article>");
        });
      })
      .fail(function() {
        $body.empty();
        $body.append("<p>Error, please try again.</p>");
      })
      .always(function() {
        $(".loader").hide();
        console.log("string");
      });
  });
});
