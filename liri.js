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

// * Title of the movie.
// * Year the movie came out.
// * IMDB Rating of the movie.
// * Rotten Tomatoes Rating of the movie.
// * Country where the movie was produced.
// * Language of the movie.
// * Plot of the movie.
// * Actors in the movie.


function logThis(results) {
    fs.appendFile("log.txt", results + "\n", function (err) {
        if (err) {
            return err

        }else{
            console.log("The log.txt was updated.")
        }
    })
}

function moviethis(info) {

            if (!info) {
                info = "Mr.Nobody";
            }

            console.log(info);

            var queryUrl = "http://www.omdbapi.com/?t=" + info + "&y=&plot=short&apikey=trilogy";

            axios.get(queryUrl).then(
             
                function (response) {

                    var movieResult = []
                    console.log("Title of the movie:" + response.data.Title);
                    console.log("Release Year:" + response.data.Year);
                    console.log("Rating:" + response.data.Rated);
                    console.log("Rotten Tomatoes Rating:" + response.data.Ratings[0].Value);
                    console.log("Country where the the movie was produced:" + response.data.Country);
                    console.log("Language:" + response.data.Language);
                    console.log("Plot of the movie:" + response.data.Plot);
                    console.log("Actors in the movie:" + response.data.Actors); 
                    movieResult.push(response.data.Title, response.data.Year,response.data.Rated,response.data.Ratings[0].Value,response.data.Country , response.data.Language,response.data.Plot, response.data.Actors )
                    logThis(movieResult);
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


function concertthis(info) {

            var queryUrl = "https://rest.bandsintown.com/artists/" + info + "/events?app_id=codingbootcamp";
            //put in the momemt ????
            axios.get(queryUrl).then(

                function (response) {
                    console.log(response.data.length);

                    if (response.data.length === 0) {
                        console.log("There are no upcoming shows");

                    } else {
                        for (var i = 0; i < response.data.length; i++) {

                            console.log("Upcoming upcoming concerts for: " + response.data[i].lineup);
                            console.log("Location " + response.data[i].venue.name);
                            //      * Date of the Event (use moment to format this as "MM/DD/YYYY")
                            console.log("Date: " + (moment(response.data[i].datetime).format('LLL')));
                        }

                    }
                })
        }


function spotifythis(info) {

            if (!info) {
                info = "The Sign";
            }
            spotify.search({ type: 'track', query: info, limit: 5 }, function (err, data) {


                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                var responseData = data.tracks;

                for (var i = 0; i < responseData.items.length; i++) {
                    console.log("Spotify this song artist(s): " + responseData.items[i].artists[0].name);
                    console.log("The song's name: " + responseData.items[i].name);
                    console.log("A preview link of the song from spotify:" + responseData.items[i].external_urls.spotify);
                    console.log("The album that the song is from: " + responseData.items[i].album.name);
                    console.log("-----------------------------------------------------");
                }


            })

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