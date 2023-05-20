const express = require("express");
const path = require("path");
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");
const hbs = require("hbs");

const app = express();

//Define paths for Express config
const publicDir = path.join(__dirname, "./public");
const viewsPath = path.join(__dirname, "./templates/views");
const partialsPath = path.join(__dirname, "./templates/partials");
//Setup handlebars engine and views lcoation
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
//setup static directory to serve
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
    helpText: "this is some helpful text.",
  });
});

app.get("/weather", (req, res) => {
  res.send({
    forecast: "It is snowing",
    location: "Tunis",
  });
});

app.get("*", (req, res) => {
  res.render("not_found", {
    text: "page not found try something else or contact us on : kwimm04@gmail.com",
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
