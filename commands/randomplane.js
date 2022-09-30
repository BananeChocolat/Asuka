const { EmbedBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');


module.exports = {
    name: 'randomplane',
    description: 'un avion random',
    permission: "Aucune",
    dm: true,
    
    async run(bot, interaction) {
        
        await interaction.reply("3 petites secondes...");
        await interaction.channel.sendTyping()
        
        const api = await fetch(`https://bancho:rU5uqeaw!LA2tyN@opensky-network.org/api/states/all`)
            .then(res => res.json())
            .then(json => json.states)
        
        const plane = api[Math.floor(Math.random() * 500)]
        const coords = [plane[5],plane[6]]
        const embed = new EmbedBuilder()
            .setTitle(plane[1])
            .setColor([255,0,255])
            .addFields({name:"__Position :__", value: `${coords[0]}W/E  |  ${coords[1]}N/S`, inline: true})
            .addFields({name:"__Origine :__", value: plane[2], inline: true})
            .addFields({name:   "__Vitesse :__",value:  `${plane[9]}m/s`, inline: true})
            .setImage(`https://maps.geoapify.com/v1/staticmap?style=osm-liberty&width=600&height=400&marker=lonlat:${coords[0]},${coords[1]};color:%23ff0000;size:medium&zoom=3&center=lonlat:${coords[0]},${coords[1]}&apiKey=b20cb377062a4239ae70ee18dc175b0a`)
            // .addField('__Altitude :__', `${plane[7]}m`, true)
            // .setFooter({text: `<t:${plane[4]}:f>`})
        
        await interaction.editReply({content: "", embeds: [embed] });
    }
}