const Discord = require('discord.js');

module.exports = async (bot, interaction) => {

    if (interaction.type === Discord.InteractionType.ApplicationCommand) {
        
        let command = require(`../commands/${interaction.commandName}`);
        console.log(`[EXEC | ${new Date().toLocaleString('fr-FR')}]`.yellow + ` Commande Slash exécutée: ${command.data.name}`.green);
        command.execute(bot, interaction);
    }
}