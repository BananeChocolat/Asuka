const Discord = require('discord.js');
const endpoint = "https://api.start.gg/gql/alpha"
const { gql, GraphQLClient } = require('graphql-request');
const config = require('../config');
const client = new GraphQLClient(endpoint, {headers: {authorization: `Bearer ${config.startGGToken}`}})
const { EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('bronyx')
        .setDescription('Le Brofesseur')
        .setDefaultMemberPermissions(null)
        .setDMPermission(true)
        .addSubcommand(subcommand =>
            subcommand
                .setName('next')
                .setDescription('ses prochains tournois')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('last')
                .setDescription('ses derniers tournois')
                .addIntegerOption(option => option
                    .setName('limit')
                    .setDescription('Nombre de tournois à afficher')
                    .setMinValue(1)
                    .setRequired(false) 
                )
        ),

    async execute(bot, message) {
        var query
        var data
        var embed = new EmbedBuilder()
        switch (message.options.getSubcommand()) {
            case 'next':
                var query = gql`{
                    user(id: 698411) {
                        player {
                            gamerTag
                        }
                        name
                        tournaments(query: {
                            sortBy: "tournament.startAt asc"
                            filter: {
                                upcoming: true
                            }
                        }) {
                            nodes {
                                name
                                startAt
                                numAttendees
                            }
                        }
                    }
                }`
                var data = await client.request(query);
                embed.setTitle(`Prochains tournois de ${data.user.name} (${data.user.player.gamerTag})`)
                .addFields(data.user.tournaments.nodes.map(tournament => {
                    return {name: tournament.name, value: `<t:${new Date(tournament.startAt).valueOf()}:f> avec ${tournament.numAttendees} participants`}
                }))
                await message.reply({embeds: [embed]});
                break;
            case 'last':
                var query = gql`{
                    user(id:${config.bronyxId}) {
                        name
                        player {
                            gamerTag
                            recentStandings(limit: ${message.options.getInteger('limit') || 1}) {
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
                }`;
                var data = await client.request(query);
                embed.setTitle(`Tournois récents de ${data.user.name} (${data.user.player.gamerTag})`)
                .addFields(data.user.player.recentStandings.map(standing => {
                    return {name: `${standing.entrant.event.tournament.name} à ${standing.entrant.event.tournament.city} (:flag_${(standing.entrant.event.tournament.countryCode).toLowerCase()}:)`, value: `${standing.placement}ème sur ${standing.entrant.event.entrants.pageInfo.total} participants`}
                }))
                await message.reply({embeds: [embed]});
                break;
            default:
                await message.reply({content: "Commande invalide"});
                break;
            }
    }
}