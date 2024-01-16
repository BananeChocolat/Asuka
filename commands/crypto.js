const Discord = require('discord.js');

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('crypto')
        .setDescription('Get current exchange value for the selected cryptocurrency (EUR)')
        .setDefaultMemberPermissions(null)
        .setDMPermission(true)
        .addStringOption(option =>
            option.setName('currency')
                .setRequired(true)
                .setDescription("the cryptocurrency to check")
                .setAutocomplete(true)),

    async autocomplete(interaction) {
        const focusedValue = interaction.options.getFocused();
        const choices = require("../assets/coins.json");
        const filteredChoices = choices.filter(choice => choice.name.toLocaleLowerCase().startsWith(focusedValue.toLocaleLowerCase()));
        await interaction.respond(
			filteredChoices.map(choice => ({ name: choice.name, value: choice.id })).slice(0,24),
		);
    },

    async execute(bot, interaction) {
        // get coin info from file assets/coins.json depending on the value of the option
        const currency = require("../assets/coins.json").find(coin => coin.id === interaction.options.get('currency').value);
        const coin = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${interaction.options.get('currency').value}&vs_currencies=EUR&include_24hr_change=true&include_last_updated_at=true&precision=2`)
            .then(res => res.json())
            .then(json => json[interaction.options.get('currency').value]);
        interaction.reply(`**1${currency.symbol.toUpperCase()} = ${coin.eur.toFixed(2)}€** @ <t:${coin.last_updated_at}>   |   24h-change: ${coin.eur_24h_change.toFixed(2)}% ${(coin.eur_24h_change>0) ? ":chart_with_upwards_trend:" : ":chart_with_downwards_trend:"}`)
    }
}