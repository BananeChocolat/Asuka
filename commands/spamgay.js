const Discord = require('discord.js');

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('spamgay')
        .setDescription('tkt')
        .setDefaultMemberPermissions(null)
        .setDMPermission(false),

    async execute(bot, interaction) {
	interaction.reply('Le Royaume de la tolérance')
        for (let i = 0; i < 15; i++) {
            await interaction.channel.send('🏳‍🌈');
            await new Promise(r => setTimeout(r, 100));
        }
    }
}
