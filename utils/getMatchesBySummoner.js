// load dependencies
const logger = require('winston');
const axios = require('axios');

module.exports = (apiKey, summonerName, region) => {
	const prefix = `https://${region}.api.riotgames.com`;
	const summonerQuery = `${prefix}/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiKey}`;
	return axios
	.get(summonerQuery)
	.then(response => {
		logger.debug('summoner data:', response.data);
		return response.data.accountId;
	})
	.then(encryptedAccountId => {
		logger.debug('encrypted account id', encryptedAccountId);
		const matchlistsQuery = `${prefix}/lol/match/v4/matchlists/by-account/${encryptedAccountId}?api_key=${apiKey}`
		return axios.get(matchlistsQuery);
	})
	.then(response => {
		logger.debug('match lists data:', response.data);
		return response.data.matches;
	})
	.then(matchesArray => {
		logger.debug('matches array:', matchesArray);
		return matchesArray;
	})
	.catch(error => {
		logger.error({
		message: error.message, 
		stack: error.stack
		});
	});
};
