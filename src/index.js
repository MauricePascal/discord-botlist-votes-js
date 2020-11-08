const { Client } = require("discord.js");
const axios = require('axios')

const application = new Client({fetchAllMembers: false});

function login(token, bot_id) {
    application.login(token).then(() => {
        id = application.user.id;
        if(id != bot_id) {
            console.log("Bot verification failed");
            return application.destroy();
        } else console.log(`Login successed with discord application ${application.user.username} | ${bot_id}`);
    }).catch(err => console.log(err));
}

const config = require("../public/config.json");
const token = config.token;
const bot_id = config.bot_id;

login(token, bot_id);

application.on("message", e => {
    if(e.channel.id != 725452453511954533) return;
    const content = e.content.replace("\n", " ");
    const args = content.split(" ");
    var i = -1;
    args.forEach(message_element => {
        i = i+1;
    });
    const bot = args[i.valueOf()].replace("https://www.discord-botlist.eu/bots/", "").replace("/vote", "");
    if(bot_id != bot) return;
    const voter = args[0].split(">")[0].replace("<@", "");
    axios.post(config.webhook_url, {
        voter_id: `${voter}`,
        bot: `${bot}`
    }).then(res => {
        console.log(`statusCode: ${res.statusCode}`)
        console.log(res)
    }).catch(error => {
        console.error(error)
    });
    console.log(`\n----------New Vote Request----------`);
    console.log("Voter: "+voter);
    console.log("Bot: "+bot);
    console.log("I: "+i);
    console.log(`----------End Vote Request----------\n`);
});