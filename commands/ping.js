const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.reply(`🏓 Pong! Latency is ${Math.abs(Date.now() - interaction.createdTimestamp)} ms`);
	},
};

