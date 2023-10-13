const Discord = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
var colors = require('colors');
const path = require('node:path');
const fs = require('node:fs');
const config = require('../config');
const rest = new REST({ version: '10' }).setToken(config.token);

module.exports = async (bot) => {
    const commands = [];
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`../commands/${file}`);
        commands.push(command.data.toJSON());
    }
    (async () => {
        try {
            console.log(`Started refreshing ${commands.length} application (/) commands.`);
    
            // The put method is used to fully refresh all commands in the guild with the current set
            const data = await rest.put(
                Routes.applicationCommands(config.clientId),{ body: commands },
            );
    
            console.log(`Successfully reloaded ${data.length} application (/) commands.`);
        } catch (error) {
            // And of course, make sure you catch and log any errors!
            console.error(error);
        }
    })();
}