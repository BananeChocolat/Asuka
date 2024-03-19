const Discord = require('discord.js');
const { joinVoicemessage } = require('@discordjs/voice');
const { VoiceConnectionStatus, entersState } = require('@discordjs/voice');
const { createAudioPlayer } = require('@discordjs/voice');


module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('say')
        .setDescription('Join a voice channel and says the given text.')
        .setDefaultMemberPermissions(null)
        .setDMPermission(false),

    async execute(bot, message) {
        await message.reply("J'arrive !");
        const connection = joinVoiceChannel({
            channelId: "812085338067304482",
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator,
        });

        const player = createAudioPlayer();
        const subscription = connection.subscribe(player);
        
        if (subscription) {
            // Unsubscribe after 5 seconds (stop playing audio on the voice connection)
            setTimeout(() => subscription.unsubscribe(), 5_000);
        }

        connection.on(VoiceConnectionStatus.Disconnected, async (oldState, newState) => {
            try {
                await Promise.race([
                    entersState(connection, VoiceConnectionStatus.Signalling, 5_000),
                    entersState(connection, VoiceConnectionStatus.Connecting, 5_000),
                ]);
                // Seems to be reconnecting to a new channel - ignore disconnect
            } catch (error) {
                // Seems to be a real disconnect which SHOULDN'T be recovered from
                connection.destroy();
            }
        });

        const resource = createAudioResource('./Asuka/assets/audio.mp3');
        player.play(resource);
        connection.subscribe(player);

        player.stop();
        connection.destroy();
    }
}