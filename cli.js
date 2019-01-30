// load dependencies
const config = require('./config/config.js');
const logger = require('winston');
const getMatchesBySummoner = require('./utils/getMatchesBySummoner.js');
const favoriteChampionReport = require('./utils/favoriteChampionReport.js');

// configure logging
const logLevel = config.logging.level || 'silly';
require('./logging/loggerSetup.js')(logger, logLevel);

// get variables
const apiKey = config.api.key;
const command = process.argv[2];
const summonerName = process.argv[3];
const region = process.argv[4] || 'na1';

logger.debug('api key =', apiKey);
logger.debug('command =', command);
logger.debug('summoner name =', summonerName);
logger.debug('region =', region);

switch (command) {
  case 'report':
    getMatchesBySummoner(apiKey, summonerName, region)
    .then(matchList => {
      favoriteChampionReport(matchList);
    })
    .catch(error => {
      logger.error(error);
    })
    break;
  default:
    break;
}