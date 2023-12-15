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

    if (message.content.startsWith('http')) {
        let link = message.content.split(' ')[0].split('/');
        let website = link[2].split('www.').pop();
        switch (website) {
            case "curseforge.com":
                message.reply({
                    content: `**${message.author.displayName}**\nhttps://modrinth.com/mod/` + link[5],
                    allowedMentions: {repliedUser: false}
                });
            case "twitter.com":
                message.reply({
                    content: `**${message.author.displayName}**\n${link.join('/').replace("twitter","fxtwitter")}`,
                    allowedMentions: {repliedUser: false}
                })
            case "x.com" :
                message.reply({
                    content: `**${message.author.displayName}**\n${link.join('/').replace("x","fxtwitter")}`,
                    allowedMentions: {repliedUser: false}
                })
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