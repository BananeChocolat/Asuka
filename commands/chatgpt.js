const { Configuration, OpenAIApi } = require("openai");
const config = require('../config');
const configuration = new Configuration({
    organization: "org-Fv5GxzUXK8EO28GHBqgC4meh",
    apiKey: config.tokenGPT,
});
const openai = new OpenAIApi(configuration);

module.exports = {
    name: 'chatgpt',
    description: 'Demande un truc à ChatGPT',
    permission: "Aucune",
    dm: true,
    options : [{
        name: 'message',
        type: 'string',
        description: 'Le message à envoyer à ChatGPT',
        required: true
    }],

    async run(bot, interaction) {
        await interaction.deferReply();
        const response = await openai.createChatCompletion({
            "model": "gpt-3.5-turbo",
            "messages": [{"role": "user", "content": interaction.options.get('message').value}]
        });
        console.log("User    > "+ interaction.options.get('message').value);
        console.log("ChatGPT > "+ response.data.choices[0].message.content.slice(0, 100));
        await interaction.editReply("> **ChatGPT** >> "+ response.data.choices[0].message.content);
    }
}