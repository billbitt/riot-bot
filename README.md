# Summoner Search #

A little CLI to make searches for summoners using RIOT's api

### Prep ###

1. get an api key from [riot api](https://developer.riotgames.com)
2. create a copy of `config/config.js.example` as `config/config.js`
3. add your api key to the config file
4. run `npm install`

### CLI Usage ###

```
$ node summoner <search method> <search term> <region>
```

`<search method>` can be `summonerId`, `name`, `puuid`, or `account`.

`<search term>` is the corresponding `encryptedSummonerId`, `summonerName`, `encryptedPUUID`, or `encryptedAccountId`. 

`<region>` is optional, and will default to north america if none is provided.

example:
```
$ node summoner name bboness
```

