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
        
        interaction.channel.sendTyping()
        
        const api = await fetch(`https://bancho:rU5uqeaw!LA2tyN@opensky-network.org/api/states/all`)
            .then(res => res.json())
            .then(json => json.states)
        
        const plane = api[Math.floor(Math.random() * 500)]
        const embed = new EmbedBuilder()
            .setTitle(plane[1])
            .setColor([255,0,255])
            .addFields({name:"__Position :__", value: `${plane[5]}W/E  |  ${plane[6]}N/S`, inline: true})
            .addFields({name:"__Origine :__", value: plane[2], inline: true})
            .addFields({name:   "__Vitesse :__",value:  `${plane[9]}m/s`, inline: true})
            // .addField('__Altitude :__', `${plane[7]}m`, true)
            // .setFooter({text: `<t:${plane[4]}:f>`})
        
        await interaction.reply({ embeds: [embed] });
    }
}