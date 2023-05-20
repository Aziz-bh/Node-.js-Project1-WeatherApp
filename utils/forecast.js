const request = require("request");

const forecast = (error, coord, callback) => {
  if (error) {
    callback("Unable to connect to weather service!", undefined);
  } else {
    const url =
      "http://api.weatherapi.com/v1/current.json?key=a1e87be597284d5f921184854231905&q=" +
      coord.lat +
      "," +
      coord.long;

    request({ url: url, json: true }, (error, { body }) => {
      if (error) {
        callback("Unable to connect to weather service!", undefined);
      } else if (body.error) {
        callback("Unable to find location", undefined);
      } else {
        callback(
          undefined,
          " It is currently " +
            body.current.temp_c +
            " degress out. There is a " +
            body.current.condition.text 
        );
      }
    });
  }
};

module.exports = forecast;
