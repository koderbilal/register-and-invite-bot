const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(client, interaction) {
		return interaction.reply('Pong!');
	},
};


/*
<a:kirmizi:1079780915917627482>
oha bune şa
em4x — bugün saat 18:07
yesilide
yap
Shuwarii — bugün saat 18:08
<a:yesil:1079780894421823500>
*/




/*----------------------------------------------------------------
buraya rahat rahat yazabiliriz.
peki

bu komutu da sana örnek olsun diye verdim 





*/