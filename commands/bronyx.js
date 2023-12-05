const Discord = require('discord.js');
const endpoint = "https://api.start.gg/gql/alpha"
const { gql, GraphQLClient } = require('graphql-request');
const config = require('../config');
const client = new GraphQLClient(endpoint, {headers: {authorization: `Bearer ${config.startGGToken}`}})

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('bronyx')
        .setDescription('Le Brofesseur')
        .setDefaultMemberPermissions(null)
        .setDMPermission(true),

    async execute(bot, message) {
        const query = gql`
        {
            user(id:698411) {
                player {
                    recentStandings(limit: 5) {
                        placement
                        entrant{
                            event{
                                tournament {
                                    name
                                    city
                                    countryCode
                                }
                                entrants{
                                    pageInfo{
                                        total
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }`
        const data = await client.request(query);
        await message.reply(`Joshua **Bronyx** Peignier a participé à ${data.user.player.recentStandings[0].entrant.event.tournament.name} à ${data.user.player.recentStandings[0].entrant.event.tournament.city} :flag_${(data.user.player.recentStandings[0].entrant.event.tournament.countryCode).toLowerCase()}: et a fini ${data.user.player.recentStandings[0].placement}ème sur ${data.user.player.recentStandings[0].entrant.event.entrants.pageInfo.total} participants.`)
    }
}