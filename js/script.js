$(function() {
  console.log("Welcome to Instagram!");
});

$("button").on("click", function() {
  $.ajax({
    method: "GET",
    url: "https://api.github.com/users/octocat"
  }).done(function(data) {
    $(".user-name").append(data.login);
  });
});
