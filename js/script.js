//1a) Listen for the select menu to change (watching value)
//1b) If the select value is an empty string, do nothing and return from this function immediately... can do with if statment//
//1c) Show a loader and clear out old stories
//2) Send a request to the NYT API for data based in the value of the select menu
//3) If successful, parse the data that we get back and decide what parts we want to append to our DOM
//4) Append that stuff to the DOM
//5) If unsuccessful, append and show a helpful error message to the user in the UI
//6) Hide the loader again

$(document).ready(function() {
  $("#button").on("change", function(event) {
    event.preventDefault();

    const selection = $(this).val();
    console.log(selection);
    const $body = $(".news");
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
