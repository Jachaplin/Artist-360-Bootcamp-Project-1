$(document).ready(function() {

	   //  $("body").on("click","#artist-search-btn", function() {
    //   event.preventDefault()
    //   $(".bs-example-modal-lg").modal("hide")
    //   $("#content").empty()

    // });
	// MUSICGRAPH API!!!
	// api key f344ee98dde459951ae8cbb4f62add7d

	$("body").on("click","#artist-search-btn", function() {

// $("nav").on("click","#bio-button", function() {
  event.preventDefault()

	var input = $("#artist-name-input")
	var artistSearch = ""
	var queryURL = "http://api.musicgraph.com/api/v2/artist/search?api_key=f344ee98dde459951ae8cbb4f62add7d&name=" + artistSearch
  var AjaxMusicgraphData = function() {

	$.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      console.log(response);
      // console.log(response.data[0].musicbrainz_image_url);
      // var artistImageURL = response.data[0].musicbrainz_image_url
      // var artistImage = $("<img>")
      // artistImage.addClass("artist-image")
      // artistImage.attr("src", artistImageURL)
      // console.log(artistImage[0])
       
 //      $("#content").append(artistImage[0])

	// var musicbrainzSearch = response.data[0].musicbrainz_id
	// console.log(musicbrainzSearch)
	// var queryURL2 = "http://musicbrainz.org/ws/2/artist/5b11f4ce-a62d-471e-81fc-a69a8278c7da?fmt=json"
    
 //    $.ajax({
 //      url: queryURL2,
 //      method: "GET"
 //    }).done(function(response) {
 //      console.log(response);
 //      // console.log(response.data[0].musicbrainz_image_url);
      
    
 //    });
     });
    }

	artistSearch = input.val()
	AjaxMusicgraphData()

  })


})