 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBXSp5la36OCI7Net3eh2U79Nc5UJfggCQ",
    authDomain: "artist-360-app.firebaseapp.com",
    databaseURL: "http://artist-360-app.firebaseio.com",
    projectId: "artist-360-app",
    storageBucket: "artist-360-app.appspot.com",
    messagingSenderId: "1088102038579"
  }
  
  firebase.initializeApp(config)

  var database = firebase.database()

  //  Button for adding train

	$("body").on("click","#artist-search-btn", function(event) {
	  event.preventDefault()

	  // Grabs user input
	 
	 	var artistName = $("#artist-name-input").val().trim()

	 		  // Creates local "temporary" object for holding train data

	 	var addArtist = {
		    name: artistName
		    
	  }
	  // Uploads train data to the database
	  
	  database.ref().push(addArtist)

	  // $("#artist-name-input").val("")

	  // Create Firebase event for adding trains to the database and a row in the html when a user adds an entry

	database.ref().on("child_added", function(childSnapshot, prevChildKey) {

console.log(childSnapshot.val())

	  // Store everything into a variable.
	  
	  var artistName = childSnapshot.val().name

	  $("#recent-search-table > tbody").append("<tr><td>" + artistName)

	})

	})