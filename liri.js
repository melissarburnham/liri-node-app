
// import { appendFile } from "fs";
require("dotenv").config();
var arg2 = process.argv[2];
var arg3 = process.argv[3];
var request = require("request");
var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);
var Twitter = require('twitter');
var client = new Twitter(keys.twitter);

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

function myTweets(){
  var params = {screen_name: 'melburn1133'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
 
    
    for (var tweet in tweets) {
    console.log(tweets[tweet].text + " Date written: " + tweets[tweet].created_at);
}
    
      }
    });
  }


function movieThis(){
    //need help: rotten tomato rating, making code dryer, and appending to log.txt

  var queryUrl = "http://www.omdbapi.com/?t=" + arg2  + "&y=&plot=short&apikey=trilogy";
  request(queryUrl, function(error, response, body) {
  if (!error && response.statusCode === 200) {
    //   console.log(JSON.parse(body));
      var movie = JSON.parse(body);
      console.log(movie.Title);
      console.log("The movie's release year is: " + movie.Year);
      console.log("The movie's IMDB rating is: " + movie.imdbRating);
      console.log("The movie's Rotten Tomato rating is: " + movie.Ratings.Source);
      console.log("The movie's country is: " + movie.Country);
      console.log("The movie's language is: " + movie.Language);       
      console.log("The movie's plot is: " + movie.Plot);
      console.log("The movie's actors are: " + movie.Actors);    
    }
  });
}

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

// fs.appendFile("log.txt", keys.twitter, function(err) {
//     if (err) {
//       console.log(err);
//     }
//     else {
//       console.log("Content added to log.txt!");
//     }
// });