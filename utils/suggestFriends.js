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
		// reduce the array of objects down to one array
		// create a map of summoners by frequency
		let friendshipMap = {};
		for (let i = 0; i < particpantsArray.length; i++) { 
			const summonersList = particpantsArray[i]; // each element is one game's worth of summoners
			console.log('summoner list', summonersList);
			for (let j = 0; j < summonersList.length; j++ ) { 
				const summonerName = summonersList[j]; // each element is a summoner
				console.log('summoner name', summonerName);
				if (friendshipMap[summonerName]) {
					friendshipMap[summonerName] += 1;
					/*
						here, we should do some logic, like make it +=2 if you won, +5 if you shared a lane and won 
					*/
				} else {
					friendshipMap[summonerName] = 1;
				}
			}
			
		}
		return friendshipMap;
	})
	.then(friendshipMap => {
		logger.info('friendship map', friendshipMap)
	})
	.catch(error => {
		logger.error(error);
	})
	
}