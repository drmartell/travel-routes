const { Router } = require('express');
const woeidMiddleware = require('../middleware/woeid');
const Trip = require('../models/Trip');
const ExplorationItem = require('../models/ExplorationItem');

module.exports = Router()
  .post('/', (req, res, next) => {
    Trip
      .create({ ...req.body })
      .then(trip => res.send(trip))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Trip
      .findByIdWithForecast(req.params.id)
      .then(trip => res.send(trip))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Trip
      .find()
      .then(trips => res.send(trips))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    const { name } = req.body;
    Trip
      .findByIdAndUpdate(req.params.id, { name }, { new: true })
      .then(trip => res.send(trip))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Trip
      .findByIdAndDelete(req.params.id)
      .then(trip => res.send(trip))
      .catch(next);
  })

  .post('/:id/item', woeidMiddleware, (req, res, next) => {
    ExplorationItem
      .create({ ...req.body, trip: req.params.id, woeid: req.woeid })
      .then(() => Trip
        .findById(req.params.id)
        .populate('exploration'))
      .then(trip => res.send(trip))
      .catch(next);
  })

  .delete('/:id/item/:explorationItemId', (req, res, next) => {
    ExplorationItem
      .findByIdAndDelete(req.params.explorationItemId)
      .then(() => Trip
        .findById(req.params.id)
        .populate('exploration'))
      .then(trip => res.send(trip))
      .catch(next);
  });
