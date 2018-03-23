
require("dotenv").config();
var fs = require("fs");
var arg2 = process.argv[2];
var arg3 = process.argv[3];
var request = require("request");
var keys = require("./keys.js");
var Twitter = require('twitter');
var client = new Twitter(keys.twitter);
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var nodeArgs = process.argv;
var songOrMovie = "";

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

      default:
      console.log('You need to tell me what to do');
    } 

//NEED TO DO:
    //fix the do what this says function
    //fix the log.txt data display


function lengthCheck(){
  for (var i = 3; i < nodeArgs.length; i++) {
    songOrMovie = songOrMovie.trim() + " " + nodeArgs[i];
  }
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

function myTweets(){
  var params = {screen_name: 'melburn1133', count: 20};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for (var tweet in tweets) {
    console.log(tweets[tweet].text + "\n" + " Date written: " + tweets[tweet].created_at + "\n");
    appendData(tweets[tweet].text + " " + tweets[tweet].created_at);
        }
      }
    });
  }

function movieThis(){
  lengthCheck();
  if (arg2 == "movie-this" && !arg3) {
    songOrMovie = "Mr. Nobody";
  }
  var queryUrl = "http://www.omdbapi.com/?t=" + songOrMovie  + "&y=&plot=short&apikey=trilogy";
  request(queryUrl, function(error, response, body) {
  if (!error && response.statusCode === 200) {
      var movie = JSON.parse(body);
      console.log(movie.Title + "\r\n" +
      "The movie's release year is: " + movie.Year + "\r\n" +
      "The movie's IMDB rating is: " + movie.imdbRating + "\r\n" +
      "The movie's Rotten Tomato rating is: " + movie.Ratings[1].Value + "\r\n" +
      "The movie's country is: " + movie.Country + "\r\n" +
      "The movie's language is: " + movie.Language + "\r\n" +     
      "The movie's plot is: " + movie.Plot + "\r\n" +
      "The movie's actors are: " + movie.Actors);    
    }
    appendData(movie.Title + " " + movie.Year + " " + movie.imdbRating + " " + movie.Ratings[1].Value
    + " " + movie.Country + " " + movie.Language + " " + movie.Plot + " " + movie.Actors);
  });
}

function callSpotify(){
  lengthCheck();
  if (arg2 == "spotify-this-song" && !arg3) {
      songOrMovie = "The Sign Ace of Base";
    }
  spotify.search({ type: 'track', query: songOrMovie }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log(
    "Band/Artist Name: " + data.tracks.items[0].artists[0].name + "\r\n" +
    "Song Name: " + data.tracks.items[0].name + "\r\n" +
    "Song Link: " + data.tracks.items[0].external_urls.spotify + "\r\n" +
    "Album Name: " + data.tracks.items[0].album.name);    

    appendData(data.tracks.items[0].artists[0].name + " " +  data.tracks.items[0].name + " " +
    data.tracks.items[0].external_urls.spotify + " " + data.tracks.items[0].album.name);
  });

}

function doWhatThisSays(){
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    var dataArr = data.split(",");
    console.log(dataArr);
  
    switch (dataArr[0]) {
      case "my-tweets":
        songOrMovie = dataArr[1];
        myTweets();
        break;
      
      case "spotify-this-song":
        songOrMovie = dataArr[1];
        callSpotify();
        break;
      
      case "movie-this":
        songOrMovie = dataArr[1];
        movieThis();
        break;
      
      case "do-what-this-says":
        doWhatThisSays();
        break;
  
        default:
        console.log('You need to tell me what to do');
      } 
  });

}

