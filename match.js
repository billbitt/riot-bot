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

const prefix = `https://${region}.api.riotgames.com`

logger.debug('api key =', apiKey);
logger.debug('summoner name =', summonerName);
logger.debug('region =', region);

// query
const summonerQuery = `${prefix}/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiKey}`;

// make request
axios
  .get(summonerQuery)
  .then(response => {
    logger.debug('summoner data:', response.data);
    return response.data.accountId;
  })
  .then(encryptedAccountId => {
    logger.info('encrypted account id', encryptedAccountId);
    const matchlistsQuery = `${prefix}/lol/match/v4/matchlists/by-account/${encryptedAccountId}?api_key=${apiKey}`
    return axios.get(matchlistsQuery);
  })
  .then(response => {
    logger.debug('match lists data:', response.data);
    return response.data.matches;
  })
  .then(matchesArray => {
    logger.info('matches array:', matchesArray);
    return;
  })
  .catch(error => {
    logger.error({
      message: error.message, 
      stack: error.stack
    });
  });