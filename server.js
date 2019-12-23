require('dotenv').config();
require('./lib/utils/connect')();
const PORT = process.env.PORT || 7890;
// eslint-disable-next-line no-console
require('./lib/app').listen(PORT, () => console.log(`Started on ${PORT}`));
