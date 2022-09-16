const Discord = require('discord.js');
const loadSlashCommands = require('../loaders/loadSlashCommands');

module.exports = async (bot, message) => {

    await loadSlashCommands(bot);

    console.log(`\n[INFO | ${new Date().toLocaleString('fr-FR')}] Logged in as ${bot.user.tag}!\n`.magenta);
}