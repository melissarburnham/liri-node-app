
// import { appendFile } from "fs";
require("dotenv").config();
var arg2 = process.argv[2];
var arg3 = process.argv[3];
var request = require("request");
var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);


switch (arg2) {
    case "my-tweets":
      myTweets();
      break;
    
    case "spotify-this-song":
      spotify();
      break;
    
    case "movie-this":
      movieThis();
      break;
    
    case "do-what-this-says":
      doWhatThisSays();
      break;
    }

// if(!arg2){
   
// }





// function myTweets(){
//     console.log(keys.twitter);
//     fs.appendFile("log.txt", keys.twitter, function(err) {
//         if (err) {
//           console.log(err);
//         }
//         else {
//           console.log("Content added to log.txt!");
//         }
//     });
// }


function movieThis(){
var queryUrl = "http://www.omdbapi.com/?t=" + arg3 + "&y=&plot=short&apikey=trilogy";
request(queryUrl, function(error, response, body) {

    if (!error && response.statusCode === 200) {
    //   console.log(JSON.parse(body));
      console.log(JSON.parse(body).Title);
      console.log("The movie's release year is: " + JSON.parse(body).Year);
      console.log("The movie's IMDB rating is: " + JSON.parse(body).imdbRating);
      console.log("The movie's Rotten Tomato rating is: " + JSON.parse(body).Ratings.Source);
      console.log("The movie's country is: " + JSON.parse(body).Country);
      console.log("The movie's language is: " + JSON.parse(body).Language);       
      console.log("The movie's plot is: " + JSON.parse(body).Plot);
      console.log("The movie's actors are: " + JSON.parse(body).Actors);    
    }
  });
}


//    * Title of the movie.
//    * Year the movie came out.
//    * IMDB Rating of the movie.
//    * Rotten Tomatoes Rating of the movie.
//    * Country where the movie was produced.
//    * Language of the movie.
//    * Plot of the movie.
//    * Actors in the movie.





//Make it so liri.js can take in one of the following commands:
// * `my-tweets`

// * `spotify-this-song`

// * `movie-this`

// * `do-what-it-says`
// ├── .env
// ├── keys.js
// ├── liri.js
// ├── liriBonus.js
// ├── log.txt
// ├── package-lock.json
// ├── package.json
// └── random.txt