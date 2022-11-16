const { SlashCommandBuilder } = require('discord.js');
const translate = require('@iamtraction/google-translate');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('translate')
		.setDescription('Translates your text!')
    .addStringOption(option =>
      option
        .setName('text')
        .setDescription("The input to translate")
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('og_lang')
        .setDescription("the original language")
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
    const lang1 = interaction.options.get('og_lang').value;
    const lang2 = interaction.options.get('final_lang').value;

    
    translate(input, { from: `${lang1}`, to: `${lang2}` }).then(res => {
      const exampleEmbed = new EmbedBuilder()
        .setColor("Random")
        .setTitle('**Translator Bot**')
        //.setURL('https://discord.js.org/')
        //.setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
        //.setDescription('Some description here')
        //.setThumbnail('https://i.imgur.com/AfFp7pu.png')
        .addFields(
          { name: 'User Input: ', value: `${input}` },
          { name: 'Original Language: ', value: `${lang1}`, inline: true },
          { name: 'Final Language: ', value: `${lang2}`, inline: true },
          { name: 'Translated Text ', value: `${res.text}`, inline: false },
        )
        //.addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
        //.setImage('https://i.imgur.com/AfFp7pu.png')
        .setTimestamp()
        //.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

      interaction.reply({ embeds: [exampleEmbed] });
    }).catch(err => {
      console.error(err);
    });

    





      
	},
};

