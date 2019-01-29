//Problem: Retrieve content from the NYT Top Stories API and add it to our site.
//If we dont get a successful response, let the user know/

//1a) Listen for the select menu to change (watching value)
//1b) If the select value is an empty string, do nothing and return from this function immediately... can do with if statment//
//1c) Show a loader and clear out old stories
//2) Send a request to the NYT API for data based in the value of the select menu
//3) If successful, parse the data that we get back and decide what parts we want to append to our DOM
//4) Append that stuff to the DOM
//5) If unsuccessful, append and show a helpful error message to the user in the UI
//6) Hide the loader again

//the same as document ready()
$(document).ready(function() {
  $("#button").on("change", function(event) {
    event.preventDefault();

    const selection = $(this).val();
    console.log(selection);
    const $body = $(".news");
    $("header").addClass("small-header");

    $(".loader").show();

    //   console.log(section); (take out )
    // if value is empty, return( easy 3 liner)
    //show loader here
    //clear stories

    //make our ajax request/use the ajax method
    //  getStories= (selections) =>{
    //     let stories= +"?" + $.param({"api-key":"o2AtApNsayCaLxZf88MW7z2YENOS7u1Q"

    //     });
    // }
    // $("#button").on("change", function() {
    //   const selection = $(this).val();
    //   console.log(selection);
    // });

    $.ajax({
      method: "GET",
      url:
        "https://api.nytimes.com/svc/topstories/v2/" +
        selection +
        ".json?api-key=o2AtApNsayCaLxZf88MW7z2YENOS7u1Q",
      datatype: "JSON"

      //paste url + section + '.json?api-key=(fill in blank with key#',
    })
      .done(function(data) {
        //=is an object! //slide:20

        $body.empty();
        console.log(data);
        let filtered = data.results.filter(function(value) {
          return value.multimedia.length;
        });

        const articles = filtered.slice(0, 12);

        $.each(articles, function(key, value) {
          const img = '<img src="' + value.multimedia[4].url + '">';
          const title = "<h2>" + value.title + "</h2>";
          const openingA = '<a href= "' + value.url + '">';

          $body.append("<article>" + openingA + img + title + "</a></article>");
        });
      })
      //append all the things

      //1. Fulter the data to only includee 12 aeticles with images.
      //2. Create .each function to run a function for each article in response. results

      //3. For each article -create constans for image URL, title and link
      //4. Make a HTML string for the article, using the constans we just created do stuff here if it doesnt work out
      //5. append string to stories section.

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
