const mongoose = require('mongoose');
const { getForecast } = require('../services/forecast');

const schema = new mongoose.Schema({
  trip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip',
    required: true
  },
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  description: String,
  woeid: String,
  latitude: Number,
  longitude: Number
});

schema.methods.getForecast = function() {
  return getForecast(this.startDate, this.woeid)
    .then(forecast => ({
      ...this.toJSON(),
      temp: (forecast && forecast.min_temp) || 'no forecast'
    }));
};

module.exports = mongoose.model('ExplorationItem', schema);
