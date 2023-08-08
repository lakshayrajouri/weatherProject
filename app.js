const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});


app.post("/", function(req, res){
  const appid = "04077ee2f57b415d6750a8e5f2842bd5";
  const query = req.body.CityName;
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appid + "&units=" + units;

  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const wheatherData = JSON.parse(data);
      const temp = wheatherData.main.temp;
      const description = wheatherData.weather[0].description;
      const icon = wheatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<p>The wheather is currently " + description + "</p>");
      res.write("<h1>The temprature in " + query + " is " + temp + " degree celcius</h1>");
      res.write("<img src = " + imageURL + ">")
      res.send();
    });
  });

});

app.listen(3000, function(){
  console.log("server is started on port 3000");
});
