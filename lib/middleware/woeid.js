const { getWOEID } = require('../services/forecast');

module.exports = (req, _res, next) => {
  getWOEID(req.body.latitude, req.body.longitude)
    .then(woeid => {
      req.woeid = woeid;
      next();
    })
    .catch(next);
};
