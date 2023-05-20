const express = require("express");
const path = require("path");
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

const app = express();

console.log(__dirname);
console.log(path.join(__dirname, "./public"));

const publicDir = path.join(__dirname, "./public");

app.set("view engine", "hbs");
app.use(express.static(publicDir));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Med Aziz benhmida",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Med Aziz benhmida",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Med Aziz benhmida",
  });
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
