// load dependencies
const config = require('./config/config.js');
const logger = require('winston');
const axios = require('axios');

// configure logging
const logLevel = config.logging.level || 'silly';
require('./logging/loggerSetup.js')(logger, logLevel);

// get variables
const apiKey = config.api.key;
const searchMethod = process.argv[2];
const searchTerm = process.argv[3];
const region = process.argv[4] || 'na1';

logger.debug('api key =', apiKey);
logger.debug('search method =', searchMethod);
logger.debug('search term =', searchTerm);
logger.debug('region =', region);


// query
let searchUrl;
if (searchMethod === 'summonerId') {
  searchUrl = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/${searchTerm}?api_key=${apiKey}`;
} else {
  searchUrl = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-${searchMethod}/${searchTerm}?api_key=${apiKey}`;
}

// make request
axios.get(searchUrl)
  .then(response => {
    // display results
    logger.info(response.data);
  })
  .catch(error => {
    logger.error({
      message: error.message, 
      stack: error.stack
    });
  });