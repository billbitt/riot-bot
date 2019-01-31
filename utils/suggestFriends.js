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
		// create a map of summoners with friendship scores
		let friendshipMap = {};
		
		for (let i = 0; i < particpantsArray.length; i++) { 
			const summonersList = particpantsArray[i]; // each element is one game's worth of summoners
			logger.debug('summoner list', summonersList);
			// figure out my team and if I won
			let myTeam;
			let iWon = false;
			for (let key in summonersList) { // find myself in the game's summoners
				const summoner = summonersList[key];
				if (summoner.name === summonerName) {
					myTeam = summoner.team;
					iWon = summoner.win;
				}
			}
			// add data to the map for the rest of the crew
			for (let key in summonersList) { 
				const summoner = summonersList[key]; // each element is a summoner
				const { name, team, win } = summoner
				if (name !== summonerName) { // skip myself
					// assign a =/- score to the friendship (like counting cards in blackjack)
					// note: add some sort of tiebreaker, like maybe a multiple based on how long ago the match was
					let friendScore = 1;
					if (team === myTeam) {
						friendScore +=1;
						if (win) {
							friendScore +=2;
						}
					}
					// add it to the map
					if (friendshipMap[name]) {
						friendshipMap[name] += friendScore;
						
					} else {
						friendshipMap[name] = friendScore;
					}
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