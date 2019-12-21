const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  departureDate: { type: Date, required: true },
  returnDate: { type: Date, required: true }
});

schema.virtual('exploration', {
  ref: 'Exploration',
  localField: '_id',
  foreignField: 'name'
});

schema.statics.findByIdWithWeather = async function(id) {
  const trip = await this
    .findById(id)
    .populate('itinerary');

  const itinerary = await Promise.all(trip.itinerary.map(item => item.getWeather()));

  return {
    ...trip.toJSON(),
    itinerary
  };
};

module.exports = mongoose.model('Trip', schema);
