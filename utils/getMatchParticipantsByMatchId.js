// load dependencies
const logger = require('winston');
const getMatchById = require('./getMatchById.js');
const apiKey = require('../config/config.js').api.key;

filterForParticpantNames = (matchData) => {
	const { participantIdentities } = matchData;
	const summonerNames = [];
	for (let i = 0; i < participantIdentities.length; i++) {
		summonerNames.push(participantIdentities[i].player.summonerName);
	}
	return summonerNames;
}

module.exports = (matchId, region) => {
	getMatchById(matchId, region)
	.then(matchData => {
		const participants = filterForParticpantNames(matchData);
		logger.debug('match participants', participants);
	})
	.catch(error => {
		logger.error({
		message: error.message, 
		stack: error.stack
		});
	});
};
