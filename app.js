const express = require("express");
const path = require("path");
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

const app = express();

console.log(__dirname);
console.log(path.join(__dirname,'./public'));

const publicDir=path.join(__dirname,'./public')

app.use(express.static(publicDir))
app.get("", (req, res) => {
  res.send("<h1> Weather</h1>");
});

app.get("/about", (req, res) => {
  res.send("<h1> About </h1>");
});
app.get("/weather", (req, res) => {
  res.send({
    forecast: "It is snowing",
    location: "Tunis",
  });
});
app.listen(3000, () => {
  console.log("server is up on port 3000");
});

const arg = process.argv[2];

if (!arg) {
  console.log("Please add a city");
} else {
  geocode(arg, (error, data) => {
    if (error) {
      return console.log(error);
    }
    forecast(error, data);
  });
}
