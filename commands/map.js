const { EmbedBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js");


module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('map')
        .setDescription("Une carte avec les coords données")
        .setDefaultMemberPermissions(null)
        .setDMPermission(false)
        .addNumberOption(option => option
            .setName('longitude')
            .setDescription('La longitude du centre de la carte (E/W)')
            .setRequired(true))
        .addNumberOption(option => option
            .setName('latitude')
            .setDescription('La latitude du centre de la carte (N/S)')
            .setRequired(true))
        .addNumberOption(option => option
            .setName('zoom')
            .setDescription('Le zoom de la carte')
            .setRequired(true)),

    async execute(bot, interaction) {
        
        await interaction.reply("3 petites secondes...");
        await interaction.channel.sendTyping()
        
        const carte = [ interaction.options.get('longitude').value,
                        interaction.options.get('latitude').value,
                        interaction.options.get('zoom').value ]

        const embed = new EmbedBuilder()
            .setTitle(`Map request de ${interaction.member.user.username}`)
            .setColor([255,0,255])
            .addFields({name:"__Position :__", value: `${carte[0]}W/E  |  ${carte[1]}N/S`, inline: true})
            .addFields({name:"__Zoom :__", value: `${carte[2]}x`})
            .setImage(`https://maps.geoapify.com/v1/staticmap?style=osm-liberty&width=600&height=400&marker=lonlat:${carte[0]},${carte[1]};color:%23ff0000;size:medium&zoom=${carte[2]}&center=lonlat:${carte[0]},${carte[1]}&apiKey=b20cb377062a4239ae70ee18dc175b0a`)
        
        await interaction.editReply({content: "", embeds: [embed] });
    }
}