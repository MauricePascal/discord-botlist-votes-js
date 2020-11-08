const { Client } = require("discord.js");
const https = require("https");

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
    const content = e.content;
    const args = content.split(" ");
    var i = -1;
    args.forEach(message_element => {
        i = i+1;
    });
    const bot = args[i].split("https://www.discord-botlist.eu/bots/")[0].replace("/vote", "");
    if(bot_id != bot) return;
    const voter = args[0].replace("<@", "").replace(">", "");
    const webhook_body = JSON.stringify({   
        voter_id: `${voter}`,
        bot: `${bot}`
    });
    const request_options = {
        hostname: config.webhook.hostname,
        port: config.webhook.port,
        path: config.webhook.path,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': webhook_body.length
        }
    }
    const req = https.request(request_options, res => {
        res.on('data', d => {
            process.stdout.write(d);
        });
    });
    req.on('error', error => {
        console.error(error);
    });
    req.write(webhook_body);
    req.end();
});