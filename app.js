const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", function (req, res) {
  const query = req.body.cityName;
  const appKey = "65f2d9dd70c05b15c8999838740a0dac";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    appKey +
    "&units=" +
    unit;
  https.get(url, function (response) {
    response.on("data", function (data) {
      var weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const desc = weatherData.weather[0].description;
      console.log(temp);
      console.log(desc);
      res.write("<h1>The temperature is " + temp + " degrees celcius</h1>");
      res.write(
        "<p>The weather is currently " + desc + " in " + query + "</p>"
      );
      const icon = weatherData.weather[0].icon;
      var iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<img src=" + iconUrl + ">");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("server running at port 3000");
});
