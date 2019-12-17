const mongoose = require('mongoose');
const { getQuote: getSimpsonQuote } = require('../services/weather');
const { getQuote: getFuturamaQuote } = require('../services/futurama');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  forecast: {
    type: String,
  }
});

schema.methods.updateForecast = async function() {
  await
    .findById(id)
    .then(profile => {
      // get new quote
      if(profile.tvShow === 'simpsons') {
        return getSimpsonQuote();
      } else if(profile.tvShow === 'futurama') {
        return getFuturamaQuote();
      }
    })
    .then(quote => {
      // update profile
      return this
        .findByIdAndUpdate(id, { tagline: quote }, { new: true });
    });
};

module.exports = mongoose.model('Exploration', schema);
