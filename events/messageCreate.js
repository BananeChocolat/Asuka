const Discord = require('discord.js');

module.exports = async (bot, message) => {

    if (message.channel.type === 'DM'){
        let text = message.content
    }

	if (message.content.slice(-7).toLowerCase().includes('quoi')) {
        if (message.author.id === '293463332781031434') {
            message.reply('feu- *pardonnez-moi maître.* :worship_symbol:');
        } else {
            message.reply('feur :slight_smile:');
        }
    }

    let prefix = '&';

    let messageArray = message.content.split(' ');
    let args = messageArray.slice(1);

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    let command = require(`../commands/${messageArray[0].slice(prefix.length)}.js`);

    if (!command) return message.reply('Cette commande n\'existe pas !');

    console.log(`[EXEC | ${new Date().toLocaleString('fr-FR')}]`.yellow + ` Commande exécutée: ${command.name}`.green);
    command.execute(bot, message, args);
};