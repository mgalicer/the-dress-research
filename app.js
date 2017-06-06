var express = require('express');
var app = express();
var csv = require("fast-csv");
var fs = require("fs");
require('dotenv').config()

var latLongData = [];
csv
  .fromPath("./researchData/Run1.csv", {headers : true})
  .on("data", function(data){
    var color = "#DA70D6";
    var question = "When you first saw the dress, what colors did you see?";
    if(data[question] == "Blue/Black") {
      color = 1;
    } else if(data[question] == "White/Gold") {
      color = 2;
    } else {
      color = 3;
    }
    latLongData.push([color, data.Latitude, data.Longitude]);

})
 .on("end", function(){
     console.log("done");
});

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');

app.get('/', function (req, res) {
  res.render('index', {data: latLongData, key: process.env.GOOGLE_MAPS})
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

