// Require the necessary discord.js classes
const keepAlive = require('./server');
const { Client, Collection, GatewayIntentBits, Events, ActivityType } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config();
process.cwd();

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
client.commands = new Collection();

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
	
});

client.on(Events.ClientReady, () => {
	console.log("Bot Online");

	const activities = [
		`${client.guilds.cache.size} Servers!`,
		'people translate stuff',
		'people',
		'hehe'
	]

	setInterval(() => {
		const status = activities[Math.floor(Math.random() * activities.length)];
		client.user.setPresence({ activities: [{ name: `${status}`, type: ActivityType.Watching	}], status: 'online', });
	}, 3000);
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

	
process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});


// Log in to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);
keepAlive();

