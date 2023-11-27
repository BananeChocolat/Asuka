const Discord = require('discord.js');

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('stress')
        .setDescription('temps avant les concours')
        .setDefaultMemberPermissions(null)
        .setDMPermission(true)
        .addStringOption(option => option
            .setName('concours')
            .setDescription('Combien de temps reste-t-il avant ce concours ?')
            .setRequired(false)
            .addChoices(
                {name:'X-ENS',value:'X-ENS'},
                {name:'CCINP',value:'CCINP'},
                {name:'Centrale-Supélec',value:'CCS'},
                {name:'Mines',value:'CCMP'}))
        .addBooleanOption(option => option
            .setName('days')
            .setDescription('Affiche le temps restant en jours')
            .setRequired(false)),

    async execute(bot, interaction) {
        rentree = new Date("Sep 4, 2023 08:00:00").getTime()
        concours = new Date("Apr 15, 2024 08:00:00").getTime()
        concours_name = "les concours"
        now = Date.now()
        var percent = ((now - rentree) / (concours - rentree) * 100) // pourcentage d'avancement de l'année
        
        function timecalc(debut,fin) {

            var diff = Math.floor(fin - debut)

            var months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30))
            diff -= months * (1000 * 60 * 60 * 24 * 30)
            var weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7))
            diff -= weeks * (1000 * 60 * 60 * 24 * 7)
            var days = Math.floor(diff / (1000 * 60 * 60 * 24))
            diff -= days * (1000 * 60 * 60 * 24)
            var hours = Math.floor(diff / (1000 * 60 * 60))
            diff -= hours * (1000 * 60 * 60)
            var minutes = Math.floor(diff / (1000 * 60))
            diff -= minutes * (1000 * 60)

            var timecode = "";
            if (months != 0) timecode += `${months} mois`;
            if (weeks != 0) timecode += `, ${weeks} semaines`;
            if (days != 0) timecode += `, ${days} jours`;
            if (hours != 0) timecode += `, ${hours} heures`;
            if (minutes != 0) timecode += `, ${minutes} minutes `;
            return timecode;
        }

        if (interaction.options.get('concours') == null) {
            interaction.reply(`Il reste **${timecalc(now, concours)}** avant les concours\nPourcentage d'avancement de l'année : **${percent.toFixed(6)}%**`)
        } else {
            switch(interaction.options.get('concours').value) {
                case 'X-ENS':
                    concours = new Date("Apr 15, 2024 08:00:00").getTime()
                    concours_name = "X-ENS"
                    break;
                case 'CCINP':
                    concours = new Date("Apr 22, 2024 08:00:00").getTime()
                    concours_name = "CCINP"
                    break;
                case 'CCS':
                    concours = new Date("May 2, 2024 08:00:00").getTime()
                    concours_name = "Centrale-Supélec"
                    break;
                case 'CCMP':
                    concours = new Date("May 13, 2024 08:00:00").getTime()
                    concours_name = "les Mines"
                    break;
                default:
                    interaction.reply("C'est quoi ce concours la ?")
                    break;
            }

        switch(interaction.options.getBoolean('days') ?? false) {
            case true:
                interaction.reply(`Il reste **${Math.floor((concours - now)/(1000*3600*24))}** jours avant __${concours_name}__\nPourcentage d'avancement de l'année : **${percent.toFixed(6)}%**`)
                break;
            case false:
                interaction.reply(`Il reste **${timecalc(now, concours)}** avant __${concours_name}__\nPourcentage d'avancement de l'année : **${percent.toFixed(6)}%**`)
                break;
            default:
                interaction.reply("Tu veux pas la date en 4/21e de seconde tant que t'y es ?")
                break;
        }
        }
    }
}