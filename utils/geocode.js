const request = require("request");
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
        lat: response.body.features[0].center[1],
        long: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
