const superagent = require('superagent');

const getForecast = async(location, yyyy, mm, dd) => {
  const locationRes = await superagent.get(`https://www.metaweather.com/api/location/search/?query=${location}`);
  const [{ woeid }] = locationRes.body
  const forecastRes = await superagent.get(`https://www.metaweather.com/api/location/${woeid}/${yyyy}/${mm}/${dd}/`);
  const [{ weather_state_name: forecast }] = forecastRes.body;
  return forecast;
};

module.exports = {
  getForecast
};
