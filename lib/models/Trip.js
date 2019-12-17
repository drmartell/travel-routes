const mongoose = require('mongoose');
const { getQuote: getSimpsonQuote } = require('../services/weather');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  departureDate: {
    type: Date,
    required: true
  },
  returnDate: {
    type: Date,
    required: true
  }
});

schema.statics.refreshTagline = function(id) {
  // find profile
  return this
    .findById(id)
    .then(profile => {
      // get new quote
      if(profile.tvShow === 'simpsons') {
        return getSimpsonQuote();
      }
    })
    .then(quote => {
      // update profile
      return this
        .findByIdAndUpdate(id, { tagline: quote }, { new: true });
    });
};

module.exports = mongoose.model('Trip', schema);
