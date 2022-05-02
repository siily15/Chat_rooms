const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  version: '1.2.3',
  canonical_url: process.env.APPLICATION_ROOT,
  api: {
    host: process.env.API_HOST,
    key: process.env.API_KEY,
    secret: process.env.API_SECRET,
  },
  plugins: [
    'plugin-one',
    'plugin.two'
  ]
};  
