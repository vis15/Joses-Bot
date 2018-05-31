const {parseUser} = require('../util/parseUser.js');
const {RichEmbed} = require('discord.js');

exports.run = (client, message, args) => {
  const user = message.mentions.users.first();
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to message them.').catch(console.error);
  const msg = args.splice(1, args.length).join(' ') || `No Message.`;

  		const embed = new RichEmbed()
  		.setColor(0x36c41f)
  		.setDescription(`${message.author} says: ${msg} to ${user}`);
  		return user.send({embed});
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'message',
  description: 'DM message a user',
  usage: 'message @User [your message]'
};
