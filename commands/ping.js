const Discord = require('discord.js');

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('ping')
        .setDescription('Pong!')
        .setDefaultMemberPermissions(null)
        .setDMPermission(true),

    async execute(bot, message) {
        await message.reply(`Pong! \t${bot.ws.ping}ms`);
    }
}