const fs = require('fs');
var colors = require('colors');

module.exports = async (bot) => {

    fs.readdirSync('./events').filter(file => file.endsWith('.js')).forEach(async file => {
        let event = require(`../events/${file}`)
        bot.on(file.split('.js').join(''), event.bind(null, bot))
        console.log(`[LOAD | ${new Date().toLocaleString('fr-FR')}]`.blue + ` Event chargé: ${file}`.green)
    })
}