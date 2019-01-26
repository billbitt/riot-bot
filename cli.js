// load dependencies
const config = require('./config/config.js');
const logger = require('winston');
const axios = require('axios');

// configure logging
const logLevel = config.logging.level || 'silly';
require('./logging/loggerSetup.js')(logger, logLevel);

// get variables
const apiKey = config.api.key;
const summonerName = process.argv[2];
const region = process.argv[3] || 'na1';

logger.debug('api key =', apiKey);
logger.debug('summoner =', summonerName);
logger.debug('region =', region);


// query
const summonerUrl = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiKey}`;
logger.debug('summonerUrl =', summonerUrl);

// make request

axios.get(summonerUrl)
  .then(response => {
    logger.info(response.data);
  })
  .catch(error => {
    logger.error({
      message: error.message, 
      stack: error.stack
    });
  });