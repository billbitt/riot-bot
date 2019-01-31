# Summoner Search #

A little CLI to make searches for summoners using RIOT's api

### Prep ###

1. get an api key from [riot api](https://developer.riotgames.com)
2. create a copy of `config/config.js.example` as `config/config.js`
3. add your api key to the config file
4. run `npm install`

### CLI Usage ###

```
$ node cli fave-champ <summoner name> <region>
$ node cli fave-teammate <summoner name> <region>
```

example:

```
$ node cli fave-champ bboness
```

### to do ###
filter so it only returns players on your team
filter out existing friends and return friend suggestions for those you don't already know
prioritize suggestions based on smarter criteria:
  - whether you have one or lost
  - whether you have played a lane together (i.e. one was sup)
  - ideally, something about your actual play styles