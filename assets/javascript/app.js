      // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBXSp5la36OCI7Net3eh2U79Nc5UJfggCQ",
    authDomain: "artist-360-app.firebaseapp.com",
    databaseURL: "https://artist-360-app.firebaseio.com",
    projectId: "artist-360-app",
    storageBucket: "artist-360-app.appspot.com",
    messagingSenderId: "1088102038579"
  }
  
  firebase.initializeApp(config)

  var database = firebase.database()

  var randomArtistArray = ["Coldplay", "Muse", "Radiohead", "Queens of the Stone Age"]

    var randomArtist =""
  $("#random-button").on("click", function() {
     var randomNumber = Math.floor(Math.random() * randomArtistArray.length)
     //randomArtistArray[randomNumber]
     $("#artist-name-input").empty()
     //console.log($("#artist-name-input").val())

     randomArtist = randomArtistArray[randomNumber]

     $("#artist-name-input").val(randomArtist)
     console.log($("#artist-name-input").val())
     console.log("123123")
    wiki()
    musicgraph()




     console.log(randomArtistArray[randomNumber])

  })
    
    $("body").on("click","#artist-search-btn", function() {
      event.preventDefault()
      $(".bs-example-modal-lg").modal("hide")
      $("#content").empty()


  //  Button for adding artist

  // $("body").on("click","#artist-search-btn", function(event) {
  //   event.preventDefault()

    // Grabs user input
   
    var artistName = $("#artist-name-input").val().trim()

        // Creates local "temporary" object for holding artist data

    var addArtist = {
        name: artistName
        
    }
    // Uploads artist data to the database
    
    database.ref().push(addArtist)

    // $("#artist-name-input").val("")

    // Create Firebase event for adding artists to the database and a row in the html when a user adds an entry
    //firebase
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

console.log(childSnapshot.val())

    // Store everything into a variable.
    
    var artistName = childSnapshot.val().name

    $("#recent-search-table > tbody").append("<tr><td>" + artistName)

  })

  // })


    });
var thisthing=""
//set the client id and api
// init function runs first on start up?
function init() {
  console.log("initting")
    gapi.client.setApiKey("AIzaSyAWtNryZAH0FZ2IGlCr1Z8DPdvQwfjztPw");
    gapi.client.load("youtube", "v3", function() {
      // q: "album|song -cover -mashup" + encodeURIComponent($("#artist-name-input").val()).replace(/%20/g, "+")
        // yt api is ready
    });
}
// WIKIPEDIA!!!!!
$("body").on("click","#artist-search-btn", wiki)
$("body").on("click","#bio-button", wiki)

var hasSearch = false
var wikiSearch=""
var toSearch = "";
function wiki() {
console.log(wikiSearch)
// $("nav").on("click","#bio-button", function() {
  event.preventDefault()

  
  console.log("wiki test")
  
  $("#content").empty()
  
  var articles = $("#content");
  var input = $("#artist-name-input");
  // var button = $("#bio-button");
  
  var searchUrl = 'https://en.wikipedia.org/w/api.php';

  var ajaxArticleData = function () {

    console.log(wikiSearch)
    console.log(toSearch)
    $.ajax({
        url: searchUrl,
        dataType: 'jsonp',
        data: {
            //main parameters
            action: 'query',
            format: 'json',
            incategory:"band",

            generator: 'search',
                //parameters for generator
                gsrsearch: toSearch + " band",
                gsrnamespace: 0,
                gsrlimit: 1,

            prop: 'extracts|pageimages',
                //parameters for extracts
                exwordcount: 10000,
                exlimit: 'max',
                explaintext: true,
                exintro: true,

                //parameters for pageimages
                piprop: 'thumbnail',
                pilimit: 'max',
                pithumbsize: 200
            },
            success: function (json) {
                var pages = json.query.pages;
                $.map(pages, function (page) {
                    var pageElement = $('<div>');

                    //get the article title
                    pageElement.append($('<h2>').append($('<a>').attr('href', 'http://en.wikipedia.org/wiki/' + page.title).text(page.title)));

                    //get the article image (if exists)
                    if (page.thumbnail) pageElement.append($('<img>').attr('width', 300).attr('src', page.thumbnail.source).addClass("wiki-image"));

                    //get the article text
                    pageElement.append($('<p>').text(page.extract));

                    pageElement.append($('<hr>'));

                    articles.append(pageElement);
                });
            }
        });
    };

    input.autocomplete({
        source: function (request, response) {
            $.ajax({
                url: searchUrl,
                dataType: 'jsonp',
                data: {
                    'action': "opensearch",
                    'format': "json",
                    'search': request.term
                },
                success: function (data) {
                    response(data[1]);
                }
            });
        }
    });

    // button.click(function () {
        articles.empty();

          var thisButton = $(this).attr('id');
          console.log(thisButton)
          //if you click the artist-search-btn get the input from user
          if(thisButton == "artist-search-btn") {
            randomArtist =""//clear randomArtist when we do a regular search
            //console.log("123123")
            toSearch = input.val();
            //wikiSearch = toSearch;
            //hasSearch = true;
          }
          else if(thisButton == "bio-button") {//if the bio-button was clicked
            console.log(randomArtist)

            if(randomArtist)//if there is a randomArtist set the wiki search to it
            {
              toSearch = randomArtist;
            }
          }
          else {//not artist-search or bio-button
            console.log("")
            toSearch=randomArtist;
          }
        //wikiSearch = toSearch
        console.log("cool monkey2")
        ajaxArticleData();
    // });
// })
}