// const { getQuote: getSimpsonsQuote } = require('../services/weather');

// module.exports = (req, _res, next) => {
//   const { tvShow } = req.body;
//   if(tvShow === 'simpsons') {
//     getSimpsonsQuote()
//       .then(quote => {
//         req.quote = quote;
//         next();
//       });
//   } else if(tvShow === 'futurama') {
//     getFuturamaQuote()
//       .then(quote => {
//         req.quote = quote;
//         next();
//       });
//   } else {
//     const err = new Error('Invalid tvShow');
//     err.status = 400;
//     next(err);
//   }
// };


// const superagent = require('superagent');

// const getForecast = async(location, yyyy, mm, dd) => {
//   const locationRes = await superagent.get(`https://www.metaweather.com/api/location/search/?query=${location}`);
//   const [{ woeid }] = locationRes.body
//   const forecastRes = await superagent.get(`https://www.metaweather.com/api/location/${woeid}/${yyyy}/${mm}/${dd}/`);
//   const [{ weather_state_name: forecast }] = forecastRes.body;
//   return forecast;
// };

// module.exports = {
//   getForecast
// };
