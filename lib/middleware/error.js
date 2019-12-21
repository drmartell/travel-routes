const mongoose = require('mongoose');

// eslint-disable-next-line no-unused-vars
module.exports = (err, _req, res, _next) => {
  let { status = 500 } = err;
  const message = err.message;

  if(err instanceof mongoose.Error.ValidationError || err instanceof mongoose.Error.CastError)
    status = 400;

  res.status(status);
  
  // eslint-disable-next-line no-console
  console.log(err);

  res.send({
    status,
    message
  });
};
