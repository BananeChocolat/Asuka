const { EmbedBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');


module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('parking')
        .setDescription("Affiche l'état actuel des parkings de Strasbourg")
        .setDefaultMemberPermissions(null)
        .setDMPermission(true),

    async execute(bot, interaction) {
        
        const parkings = await fetch('https://data.strasbourg.eu/api/records/1.0/search/?dataset=occupation-parkings-temps-reel&q=&rows=-1&sort=-ident&timezone=Europe%2FParis')
            .then(res => res.json())
            .then(json => json.records)
        
        const embed = new EmbedBuilder()
            .setTitle('Etat actuel des parkings de Strasbourg')
            .setColor([255,0,255])
            
        const embed2 = new EmbedBuilder()
            .setColor([255,0,255])
            .setTimestamp()
            .setFooter({text:'Données fournies par la ville de Strasbourg'})


        parkings.forEach(parking => {
            if (parking.fields.ident <= 19) {
                if (parking.fields.etat == 2) {
                    embed.addFields({name: ':no_entry_sign: '+parking.fields.nom_parking, value: "Le parking est fermé", inline: true})
                } else if (parking.fields.etat == 1) {
                    embed.addFields({name: ':white_check_mark: '+parking.fields.nom_parking, value: `${parking.fields.libre} places disponibles`, inline: true})
                } else if (parking.fields.etat == 3) {
                    embed.addFields({name: ':warning: '+parking.fields.nom_parking, value: "Le parking est complet", inline: true})
                } else {
                    embed.addFields({name: ':question: '+parking.fields.nom_parking, value: "Etat indisponible pour l'instant", inline: true})
                }
            } else {
                if (parking.fields.etat == 2) {
                    embed2.addFields({name: ':no_entry_sign: '+parking.fields.nom_parking, value: "Le parking est fermé", inline: true})
                } else if (parking.fields.etat == 1) {
                    embed2.addFields({name: ':white_check_mark: '+parking.fields.nom_parking, value: `${parking.fields.libre} places disponibles`, inline: true})
                } else if (parking.fields.etat == 3) {
                    embed2.addFields({name: ':warning: '+parking.fields.nom_parking, value: "Le parking est complet", inline: true})
                } else {
                    embed2.addFields({name: ':question: '+parking.fields.nom_parking, value: "Etat indisponible pour l'instant", inline: true})
                }
            }
        });

        await interaction.reply({content: "", embeds: [embed,embed2] });
    }
}