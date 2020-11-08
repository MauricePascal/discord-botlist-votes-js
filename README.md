# discord-botlist-votes-js
Little JavaScript Library for recieving votes from discord-botlist.eu

## Requirements
1. Node.JS

## Installation
1. Clone the repo
2. Go into the project folder
3. Fill out the config.json
4. Type ```$ npm install``` in the project folder
5. Type ```$ npm start```

## Incoming Webhook Body Example
```json
{ voter_id: '622784776234991626', bot: '493066387183632387' }
```

## Example config.json
```json
{
    "bot_id": "622784776234991626",
    "token": "NDkzMDY2Mzg3MTgzNjMyMzg3.Xkasesrd.thfjzZp9B7-BnQetXP6f9s",
    "webhook_url": "http://localhost:80/recieve_votes/dbl_eu"
}```