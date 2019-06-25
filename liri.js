require("dotenv").config();
var keys = require("./keys.js");

var fs = require("fs");

// axios is for the movie function 
var axios = require("axios");
var Spotify = require("node-spotify-api");
var moment = require("moment");
var spotify = new Spotify(keys.spotify);

var action = process.argv[2];
var user = process.argv.slice(3).join("+");




var queryUrl = "http://www.omdbapi.com/?t=" + user + "&y=&plot=short&apikey=trilogy";

console.log(queryUrl);



function moviethis() {
    axios.get(queryUrl).then(
        function (response) {
            console.log("Title of the movie:" + response.data.Title);
            console.log("Release Year:" + response.data.Year);
            console.log("Rating:" + response.data.Rated);
            console.log("Rotten Tomatoes Rating:" + response.data.Ratings[1].Value);
            console.log("Country where the the movie was produced:" + response.data.Country);
            console.log("Language:" + response.data.Language);
            console.log("Plot of the movie:" + response.data.Plot);
            console.log("Actors in the movie:" + response.data.Actors);
        })
        .catch(function (error) {
            if (error.response) {
                console.log("---------------Data---------------");
                console.log(error.response.data);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }

            console.log(error.config);
        });
}





// * Title of the movie.
// * Year the movie came out.
// * IMDB Rating of the movie.
// * Rotten Tomatoes Rating of the movie.
// * Country where the movie was produced.
// * Language of the movie.
// * Plot of the movie.
// * Actors in the movie.


function concertthis(info) {
    console.log(`Your in concert this ${info}`)
}

function spotifythis(info) {
    spotify.search({ type: 'track', query: info }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data);
    });
}



function dothis() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) return console.log(err);
        var dataArray = data.split(",");
        console.log(dataArray);
        switCase(dataArray[0], dataArray[1])
    })

}

// need to use slice somewhere 

function switCase(command, info) {
    switch (command) {
        case "concert-this":
            concertthis(info);
            break;
        case "spotify-this-song":
            spotifythis(info);
            break;
        case "movie-this":
            moviethis(info);
            break;
        case "do-what-it-says":
            dothis();
            break;

        default:
            return console.log("Please enter a valid command");
    }
}

switCase(action, user);

// * `concert-this`

//    * `spotify-this-song`

//    * `movie-this`

//    * `do-what-it-says`