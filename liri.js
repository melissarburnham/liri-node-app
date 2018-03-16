require("dotenv").config();

//Add the code required to import the keys.js file and store it in a variable.

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// Make it so liri.js can take in one of the following commands: