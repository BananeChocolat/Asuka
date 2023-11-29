const Discord = require('discord.js');
const { AttachmentBuilder } = require('discord.js')

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('king')
        .setDescription('The King of Toulouges')
        .setDefaultMemberPermissions(null)
        .setDMPermission(false),

    async execute(bot, message) {
        const attachment = new AttachmentBuilder("./assets/king_qr.png")
        message.reply({ content: "**The King of Toulouges**", files: [attachment] })
    }
}