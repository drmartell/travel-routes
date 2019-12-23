const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: { type: String, required: true }
}, {
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.id;
    }
  }
});

schema.virtual('exploration', {
  ref: 'ExplorationItem',
  localField: '_id',
  foreignField: 'trip'
});

schema.statics.findByIdWithForecast = async function(id) {
  try {
    console.log('finding by id with forecast');
    const trip = await this
      .findById(id)
      .populate('exploration');

    const exploration = await Promise.all(trip.exploration.map(item => item.getForecast()));

    return {
      ...trip.toJSON(),
      exploration
    };
  }
  catch(err) {
    console.log(err);
  }
};

module.exports = mongoose.model('Trip', schema);
