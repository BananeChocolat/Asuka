const fs = require('fs')
var colors = require('colors');

module.exports = async (bot) => {

    fs.readdirSync('./commands').filter(file => file.endsWith('.js')).forEach(async file => {
        let command = require(`../commands/${file}`)
        if (!command.name || typeof command.name !== 'string') throw new TypeError("C'est pas une commande ca frr")

        bot.commands.set(command.name, command)
        console.log(`[LOAD | ${new Date().toLocaleString('fr-FR')}]`.blue + ` Commande chargée: ${command.name}`.green)
    })
}