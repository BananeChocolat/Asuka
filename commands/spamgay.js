const Discord = require('discord.js');

module.exports = {
    name: 'spamgay',
    description: '15 gays',
    permission: "Aucune",
    dm: false,

    async run(bot, interaction) {
        for (let i = 0; i < 15; i++) {
            await interaction.channel.send('🏳‍🌈');
        }
        interaction.reply('Le Royaume de la tolérance')
    }
}