const Discord = require('discord.js');

module.exports = async (bot, message) => {

    if (message.channel.type === 'DM'){
        let text = message.content
    }

	if (/quoi*\W*(\([^)]*\)|(\s*,\s*))*$/.test(message.content.toLowerCase())) {
        if (message.author.id === '293463332781031434') {
            message.reply('feu- *pardonnez-moi maître.* :worship_symbol:');
        } else {
            message.reply('feur :slight_smile:');
        }
    }

    if (message.content.startsWith('http')) {
        const link = message.content.split(' ')[0].split('/');
        const website = link[2].split('www.').pop();
        let message_content = "Unknown website";
        let is_known_website = false;
        switch (website) {
            case "curseforge.com":
                message_content = `**${message.author.displayName}**\nhttps://modrinth.com/mod/` + link[5]
                is_known_website = true;
                break;
            case "twitter.com":
                message_content = `**${message.author.displayName}**\n${link.join('/').replace("twitter","fxtwitter")}`
                is_known_website = true;
                break;
            case "vm.tiktok.com":
                const regexp_link = /https.*\d{15,}/;
                let fetch_res = await fetch(message.content.split(' ')[0], {redirect:'manual'})
                    .then(res => res.text())
                let full_link = regexp_link.exec(fetch_res)[0]
                message_content = full_link.replace("tiktok.com", "vxtiktok.com")
                is_known_website = true;
                break;
            case "x.com" :
                message_content = `**${message.author.displayName}**\n${link.join('/').replace("x","fxtwitter")}`;
                is_known_website = true;
                break;
        }
        if (is_known_website) {
            message.reply({
                content: message_content,
                allowedMentions: {repliedUser: false}
            });
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
