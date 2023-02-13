const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    
    res.sendFile(__dirname + "/index.html");

    // res.send("The server is up and running");
});

app.post("/", function(req, res) {
console.log(req.body.cityName);
const query = req.body.cityName;
    const units = "metric"
    const apiKey = "b996bedccc04043d47c1c9dd66486d96"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data) {
            // console.log(data);
            const weatherData = JSON.parse(data);
            // console.log(weatherData);
            const temp = weatherData.main.temp;
            // console.log(temp);
            const weatherDescription = weatherData.weather[0].description;
            // console.log(weatherDescription);
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon +"@2x.png";
            // console.log(imageURL);
            // res.send("<h1>The temperature in Richmond is " + temp + " degree celcius.</h1>")
            res.write("<p>The weather is currently " + weatherDescription +"</p>");
            res.write("<h1>The temperature in " + query + " is " + temp + " degree celcius.</h1>");
            res.write("<img src=" + imageURL + ">");
            res.send();
        })

    })


});


app.listen(3000, function() {
    console.log("The server is running on port 3000");
})