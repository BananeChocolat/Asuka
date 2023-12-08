console.log('\n\n\nTaux de synchronisation en augmentation... \n');

const Discord = require('discord.js');
const config = require('./config');
const intents = new Discord.IntentsBitField(40451) //3276799
const bot = new Discord.Client({disableMentions: "all", shards: "auto", restTimeOffset: 0, intents});
// const loadCommands = require('./loaders/loadCommands');
const loadEvents = require('./loaders/loadEvents');

bot.on('error', (err) => {
    console.log(err)
});

bot.commands = new Discord.Collection();


bot.login(config.token);
// loadCommands(bot);
loadEvents(bot);

// robocopy "D:\Documents\GitHub\Asuka" "\\sshfs\bancho@192.168.1.168\Asuka" /s /XD "D:\Documents\GitHub\Asuka\node_modules"
