
var fs = require("fs");
require("dotenv").config();
// require("./random.text");
var arg2 = process.argv[2];
var arg3 = process.argv[3];
var request = require("request");
var keys = require("./keys.js");
var Twitter = require('twitter');
var client = new Twitter(keys.twitter);
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

switch (arg2) {
    case "my-tweets":
      myTweets();
      break;
    
    case "spotify-this-song":
      callSpotify();
      break;
    
    case "movie-this":
      movieThis();
      break;
    
    case "do-what-this-says":
      doWhatThisSays();
      break;
    }

// if(!arg2){
   
//NEED TO DO:
    //fix spotify function--figure out what to console.log
    //write the !arg2 function
    //fix the do what this says function
    //text the log.txt data

function myTweets(){
  var params = {screen_name: 'melburn1133', count: 20};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for (var tweet in tweets) {
    console.log(tweets[tweet].text + " Date written: " + tweets[tweet].created_at);
        }
      }
      appendData(tweets);
    });
  }


function movieThis(){
  var queryUrl = "http://www.omdbapi.com/?t=" + arg3  + "&y=&plot=short&apikey=trilogy";
  request(queryUrl, function(error, response, body) {
  if (!error && response.statusCode === 200) {
      var movie = JSON.parse(body);
      // console.log(movie);
      console.log(movie.Title);
      console.log("The movie's release year is: " + movie.Year);
      console.log("The movie's IMDB rating is: " + movie.imdbRating);
      console.log("The movie's Rotten Tomato rating is: " + movie.Ratings[1].Value);
      console.log("The movie's country is: " + movie.Country);
      console.log("The movie's language is: " + movie.Language);       
      console.log("The movie's plot is: " + movie.Plot);
      console.log("The movie's actors are: " + movie.Actors);    
    }
    appendData(movie);
  });
}

function callSpotify(){
  spotify.search({ type: 'track', query: arg3 }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log(data.tracks.items[0].name);
    console.log(data.tracks.items[0].artists[0].name);
    console.log(data.tracks.items[0].external_urls.spotify);
    console.log(data.tracks.items[0].album.name);    
  });
}

function doWhatThisSays(){
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    console.log(data);
  });
}


function appendData(callback){
  fs.appendFile("log.txt", JSON.stringify(callback) + "\n", function(err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log("Content added to log.txt!");
    }
});
}

