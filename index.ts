console.log('Starting bot...')

import DiscordJS, { GatewayIntentBits } from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

const client = new DiscordJS.Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages
    ]
})

client.on('messageCreate', (message) => {
    if (message.content === 'ping') {
        message.reply('pong')
    }
})


client.on('ready', () => {
    console.log(`Logged in as ${client.user?.tag}!`)
})

client.login(process.env.TOKEN)