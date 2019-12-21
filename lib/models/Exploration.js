const mongoose = require('mongoose');
const { getForecast } = require('../services/weather');

const schema = new mongoose.Schema({
  trip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip',
    required: true
  },
  name: { type: String, required: true },
  location: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  description: String,
  woeid: String,
  latitude: Number,
  longitude: Number
});

schema.methods.getForecast = function() {
  return getForecast(this.startDate, this.woeid)
    .then(weather => ({
      ...this.toJSON(),
      temp: (weather && weather.min_temp) || 'no forecast'
    }));
};

module.exports = mongoose.model('Exploration', schema);
