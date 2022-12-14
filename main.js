console.log('\n\n\nTaux de synchronisation en augmentation... \n');

const Discord = require('discord.js');
const config = require('./config');
const intents = new Discord.IntentsBitField(3276799)
const bot = new Discord.Client({disableMentions: "all", shards: "auto", restTimeOffset: 0, intents});
const loadCommands = require('./loaders/loadCommands');
const loadEvents = require('./loaders/loadEvents');

bot.commands = new Discord.Collection();

bot.login(config.token);
loadCommands(bot);
loadEvents(bot);
