const { EmbedBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');


module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('randomplane')
        .setDescription('un avion random')
        .setDefaultMemberPermissions(null)
        .setDMPermission(true),

    async execute(bot, interaction) {
        
        await interaction.reply("3 petites secondes...");
        await interaction.channel.sendTyping()
        
        const api = await fetch(``)
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
            .setImage(``)
            // .addField('__Altitude :__', `${plane[7]}m`, true)
            // .setFooter({text: `<t:${plane[4]}:f>`})
        
        await interaction.editReply({content: "", embeds: [embed] });
    }
}
