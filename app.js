const request = require("request");

const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");
// const url =
//   "http://api.weatherapi.com/v1/current.json?key=a1e87be597284d5f921184854231905&q=Tunis";
// request({ url: url, json: true }, (error, response) => {
//   if (error) {
//     console.log("Unable to connect to the server!");
//   } else if (response.body.error) {
//     console.log("Unable to find location!");
//   } else {
//     console.log(response.body.current);
//     console.log(
//       `its currently ${response.body.current.temp_c} degree c. it's ${response.body.current.condition.text} outside `
//     );
//   }
// });

geocode("tunis", (error, data) => {
  forecast(error, data);
  console.log("Error:", error);
  console.log("Data:", data);
});
