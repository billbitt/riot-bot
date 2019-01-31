const logger = require('winston');
const getMatchParticipantsByMatchId = require('./getMatchParticipantsByMatchId.js');
const getMatchesBySummonerName = require('./getmatchesBySummonerName.js');

module.exports = (summonerName, region) => {
	return getMatchesBySummonerName(summonerName, region)
	.then(matchList => {
		const matchId = matchList[0].gameId;
		return getMatchParticipantsByMatchId(matchId, region);
	})
	.then(match => {

	})
	.catch(error => {
		logger.error(error);
	})
	
}