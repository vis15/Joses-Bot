const {RichEmbed} = require('discord.js');

exports.run = (client, message) => {
	
  const embed = new RichEmbed()
  		.setColor(0x7f26c0)
  		.setDescription(`**Nate is the best. That's a fact!!!!\nXDDDDDD **`);
  		return message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'nate',
  description: 'nate',
  usage: 'nate'
};
