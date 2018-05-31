const {RichEmbed} = require('discord.js');

exports.run = (client, message) => {

  const embed = new RichEmbed()
  		.setColor(0x3535c4)
  		.setDescription(`**Jose is the best in the whole world!!!!! :) :) :) **`);
  		return message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'jose',
  description: 'Jose',
  usage: 'jose'
};
