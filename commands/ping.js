const Discord = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Pong!',
    permission: "Aucune",
    dm: true,

    async run(bot, message) {
        await message.reply(`Pong! \t${bot.ws.ping}ms`);
    }
}