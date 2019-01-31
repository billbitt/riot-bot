// load dependencies
const config = require('./config/config.js');
const logger = require('winston');
const favoriteChampion = require('./utils/favoriteChampion.js');
const suggestFriends = require('./utils/suggestFriends.js');

// configure logging
const logLevel = config.logging.level || 'silly';
require('./logging/loggerSetup.js')(logger, logLevel);

// get variables
const command = process.argv[2];
const summonerName = process.argv[3];
const region = process.argv[4] || 'na1';

logger.debug('command =', command);
logger.debug('summoner name =', summonerName);
logger.debug('region =', region);

switch (command) {
  case 'fave_champ':
      favoriteChampion(summonerName, region);
    break;
  case 'friends':
      suggestFriends(summonerName, region);
    break;
  default:
    break;
}