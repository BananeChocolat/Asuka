const Discord = require('discord.js');

module.exports = {
    name: 'spamping',
    description: 'Ping 15x le pd mentionné',
    permission: "Aucune",
    dm: false,
    options : [
        {
            name: 'pd',
            type: 'user',
            description: 'Le pd à ping',
            required: true
        }
    ],

    async run(bot, interaction) {

        if (interaction.options.get('pd').value === '293463332781031434') {
            await interaction.reply("Tu veux vraiment spam le créateur d'Asuka ?");
        } else if (interaction.member.id === '440879014383714304' || interaction.member.id === '293463332781031434'){
            await interaction.reply(`Oh je vais le démarrer ce <@${interaction.options.get('pd').value}>`);
            for (let i = 0; i < 15; i++) {
                await interaction.channel.send(`<@${interaction.options.get('pd').value}>`);
            }
        } else {
            await interaction.reply("T'as pas le droit de spammer des gens toi");
        }

    }
}
