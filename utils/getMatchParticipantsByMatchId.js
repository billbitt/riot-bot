// load dependencies
const logger = require('winston');
const getMatchById = require('./getMatchById.js');
const apiKey = require('../config/config.js').api.key;

filterForParticpantNames = (matchData) => {
	const participantIdentities = matchData.participantIdentities;
	const summonerNames = [];
	for (let i = 0; i < participantIdentities.length; i++) {
		summonerNames.push(participantIdentities[i].player.summonerName);
	}
	return summonerNames;
}

module.exports = (matchId, region) => {
	console.log('test1', matchId, region);
	return getMatchById(matchId, region)
	.then(matchData => {
		const participants = filterForParticpantNames(matchData);
		// logger.debug('match participants', participants);
		return participants;
	})
	.catch(error => {
		logger.error({
		message: error.message, 
		stack: error.stack
		});
	});
};
