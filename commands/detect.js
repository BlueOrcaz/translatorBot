const { SlashCommandBuilder } = require('discord.js');
const translate = require('@iamtraction/google-translate');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('detects')
		.setDescription('Automatically detects the language')
    .addStringOption(option =>
      option
        .setName('text')
        .setDescription("The input to translate")
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('final_lang')
        .setDescription("the language to translate to")
        .setRequired(true)
    ),
	async execute(interaction) {
    const input = interaction.options.get('text').value;
    const lang1 = interaction.options.get('final_lang').value;

    
    translate(input, { to: `${lang1}`}).then(res => {
        const msgEmbed = new EmbedBuilder()
        .setColor("Random")
        .setTitle('**Translator Bot**')
        .addFields(
            { name: 'User Input: ', value: `${input}` },
            { name: 'Translated Language: ', value: `${lang1}`},
            { name: 'Final Translation: ', value:`${res.text}` }
        )
        .setTimestamp()

    interaction.reply({ embeds: [msgEmbed]});
    
    }).catch(err => {
        console.error(err);
    })
	},
};

