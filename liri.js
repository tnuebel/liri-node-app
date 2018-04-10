//getting the API KEYS CONFIGURATION:
require("dotenv").config();

//LOADING key.js
var keys = require("./key.js");

//Twitter Loading:
var Twitter = require('twitter');
//End of Twitter

//require spotify:
var Spotify = require('node-spotify-api');
//end of spotify

var request = require('request');

// reading file system:
var fs = require("fs");

//making constructive objects:
var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

// process argv:
var command = process.argv[2];

// * `spotify-this-song`

if (command == "spotify-this-song") {
  var song = process.argv[3];

spotify.search({ type: 'track', query: song, limit: 20 }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

      // console.log(data.tracks.items); 
    for(var i = 0; i<data.tracks.items.length; i++){
      var thesong = data.tracks.items[i];
      // artists
      var artistsObj = thesong.artists;
      var artistsCatch = "";
      // console.log(artistsObj);
        for(var x = 0; x<artistsObj.length; x++){
            artistsCatch = artistsCatch + artistsObj[x].name + " | ";
        }

      var separator = (i+1)+"----------------";
      var songTxt = "\n" + separator + "\nArtist " + artistsCatch + "\nSong name" + thesong.name + "\nPreview" + thesong.preview_url + "\nAlbum names" + thesong.album.name + "\n";
      console.log(songTxt);

      // save the songTxt values to random.txt file later
      appendData(SongTxt);
    }
  });
}
// * `movie-this`
if (command == "movie-this") {
  movieName = process.argv[3];
  omdbKey = "eef4047e";
  request("http://www.omdbapi.com/?t=" + movieName + "&apikey=" + omdbKey, function (error, response, body) {
      if (!error && response.statusCode === 200) {
          var separator = "-----------";
          var Title = "Title: " + JSON.parse(body).Title;
          var Year = "Year: " + JSON.parse(body).Year;
          var Rated = "Rated: " + JSON.parse(body).Rated;
          var omdbRating = "omdbRatings: " + JSON.parse(body).imdbRating;
          var Country = "Country: " + JSON.parse(body).Country;
          var Language = "Language: " + JSON.parse(body).Language;
          var Plot = "Plot " + JSON.parse(body).Plot;

          var movieTxt = "\n" + separator + "\n" + Title + "\n" + Year + "\n" + Rated + "\n" + omdbRating + "\n" + Country + "\n" + Language + "\n" + Plot + "\n" + "\n" + separator + "\n";
          console.log(movieTxt);
          
          appendData(movieTxt);
      }
  });
}
// * `do-what-it-says`

if(command == "do-what-it-says"){
  // load data from random.txt
  fs.readFile("./random.txt", "utf8" , function(err, data){
    console.log(data);
  })
}

function appendData(data){
fs.appendFile('random.txt', data, (err) =>{
  if (err) throw err;
});
}

if (command == "my-tweets") {

  //twitter testing:
  var params = { screen_name: 'Fact', count: 20 };
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      // tweets an array
      for(var i = 0; i <tweets.length; i++) {

        var sep = (i+1)+". =================";
        // console.log(separator);
        

        var theDate = tweets[i].created_at;

        var theTXT = tweets[i].text;

        var CC = ("\n" + sep + "\n" + theDate + "\n" + theTXT + "\n");

        console.log(CC);

        // append theTXT value to the random.txt file 
        appendData(CC);
      }

    } else {
      console.log(error);
    }
  });

} // twitter ends here

