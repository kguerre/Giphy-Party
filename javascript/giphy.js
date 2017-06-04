var topics = [
"Seinfeld",
"Gilmore Girls",
"Peaky Blinders",
"Stranger Things",
"Mr. Robot",
"Family Matters",
"Hey Arnold",
"Twin Peaks",
"Spongebob",
"Grey's Anatomy"];

//FUNCTIONS
  $(document).ready(function() {
 
//renderButtons()   
  function renderButtons() {

    $("#tv-button").empty();

    for (var i = 0; i < topics.length; i++) {

        var t = $("<button>");
        t.addClass("tv");
        t.attr("data-show", topics[i]);
        t.text(topics[i]);
        $("#tv-button").append(t);
    }
  }

  $("#add-show").on("click", function(event) {
   
    event.preventDefault();
      var show = $("#tv-input").val().trim();
      topics.push(show);
      renderButtons();
      $("#tv-input").val('');
      console.log(topics);

  });

renderButtons();

//AJAX Request

$(document).on("click", ".tv", function() {

  $("#tv-shows").empty();

var tvShow = $(this).attr("data-show");
console.log(this)
var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + tvShow + '&limit=10&rating=pg&api_key=dc6zaTOxFJmzC'; 

  $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {
      console.log(response);

      var results = response.data;
      var random = Math.floor(Math.random()*results.length);
      var count = 0;

      for (var i = 0; i < results.length; i++) {
        var tvDiv = $("<div class='tv-gifs'>");
        var rating = results[i].rating;

        var p = $("<p>").html("Rating: " + rating);

        var tvImage = $("<img class='gif'>");
        tvImage.attr("src", results[i].images.fixed_height_still.url);
        tvImage.attr("data-state", "still");
        tvImage.attr("data-still", results[i].images.fixed_height_still.url);
        tvImage.attr("data-animate", results[i].images.fixed_height.url);

        tvDiv.prepend(p);
        tvDiv.prepend(tvImage);
        $("#tv-shows").prepend(tvDiv);

      }

    });

});


$(document).on("click", ".gif", function () {
  var state = $(this).attr("data-state")
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
    
    

});