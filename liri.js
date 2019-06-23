require("dotenv").config();
var keys = require("./keys.js");

var fs= require("fs");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var moment = require("moment");
var spotify = new Spotify(keys.spotify);

var action = process.argv[2];
var user = process.argv.slice(3).join("+");

function concertthis(info){
    console.log(`Your in concert this ${info}`)
}

function spotifythis(info){
    spotify.search({ type: 'track', query: info }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});
}

function dothis(){
    fs.readFile("random.txt","utf8", function(err, data){
        if(err) return console.log(err);
        var dataArray = data.split(",");
        console.log(dataArray);
        switCase(dataArray[0],dataArray[1])
    })

}

function switCase(command,info){
    switch(command){
        case"concert-this":
        concertthis(info);
        break;
        case"spotify-this-song":
        spotifythis(info);
        break;
        case"movie-this":
        moviethis(info);
        break;
        case"do-what-it-says":
        dothis();
        break;

        default: 
        return console.log("Please enter a valid command");
}
}

switCase(action,user);

// * `concert-this`

//    * `spotify-this-song`

//    * `movie-this`

//    * `do-what-it-says`