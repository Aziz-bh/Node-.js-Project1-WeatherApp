const { json } = require("express");
const request = require("request");

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

// const url2 =
//   "https://api.mapbox.com/geocoding/v5/mapbox.places/Tunis.json?access_token=pk.eyJ1IjoiYXppemJoIiwiYSI6ImNsaHYwdDQ2djA1ODQzam13OWQ5ZnY2MGoifQ.6xXbi-Bc5jDzRj7n8bdd6w&limit=1";
// request({ url: url2, json: true }, (error, response) => {
//   if (error) {
//     console.log("Unable to connect to the server!");
//   } else if (response.body.features.length == 0) {
//     console.log("cant find this location");
//   } else {
//     const long = response.body.features[0].center[1];
//     const lat = response.body.features[0].center[0];
//     console.log(response.body.features[0].center);
//   }
// });

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiYXppemJoIiwiYSI6ImNsaHYwdDQ2djA1ODQzam13OWQ5ZnY2MGoifQ.6xXbi-Bc5jDzRj7n8bdd6w&limit=1";

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Error, Unable to connect to the server!", undefined);
    } else if (response.body.features.length === 0) {
      callback("Error, Unable to find location!", undefined);
    } else {
      callback(undefined, {
        lat: response.body.features[0].center[0],
        long: response.body.features[0].center[1],
        location: response.body.features[0].place_name,
      });
    }
  });
};

geocode("tunis", (error, data) => {
  console.log("Error:", error);
  console.log("Data:", data);
});
