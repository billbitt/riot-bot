const logger = require('winston');
const getMatchParticipantsByMatchId = require('./getMatchParticipantsByMatchId.js');
const getMatchesBySummonerName = require('./getmatchesBySummonerName.js');

const matchLimit = require('../config/config.js').matchLimit || 100;

const delayedFunction = (callback, arg1, arg2) => {
	console.log('test0', arg1, arg2);
 	return callback.call(this, arg1, arg2)
};

const promiseWrapper = (callback, arg1, arg2) => {
	return new Promise((resolve, reject) => {
		callback(arg1, arg2)
		.then(result => {
			resolve(result);
		})
		.catch(error => {
			reject(error);
		})
	});
}

module.exports = (summonerName, region) => {
	return getMatchesBySummonerName(summonerName, region)
	.then(matchList => {
		// filter matchList b/c rate limiting
		let reducedMatchList = [];
		for (let i = 0; i < matchLimit; i++) {
			reducedMatchList.push(matchList[i])
		}
		//make a set of promisses, one for each match
		return Promise.all(reducedMatchList.map(match => {
			console.log('matchid', match.gameId)
			console.log('region', region)
			return getMatchParticipantsByMatchId(match.gameId, region);
		}));
	})
	.then(particpantsArray => {
		logger.debug('participants Array', particpantsArray);
	})
	.catch(error => {
		logger.error(error);
	})
	
}