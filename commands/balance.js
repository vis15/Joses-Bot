var money = require('discord-money');
const {parseUser} = require('../util/parseUser.js');
const {RichEmbed} = require('discord.js');

exports.run = (client, message) => {
  const user = message.mentions.users.first();
  
  if (message.mentions.users.size < 1)
  {
  		money.fetchBal(message.author.id).then((i) => { // money.fetchBal grabs the userID, finds it, and puts it into 'i'.
  				const embed = new RichEmbed()
  				.setColor(0x36c41f)
  				.setDescription(`Your Balance **$${i.money}**`);
  				return message.channel.send({embed});
        })
        return;
  }
  
  money.fetchBal(user.id).then((i) => { // money.fetchBal grabs the userID, finds it, and puts it into 'i'.
  		const embed = new RichEmbed()
  		.setColor(0x36c41f)
  		.setDescription(`${user.tag} New Balance **$${i.money}**`);
  		return message.channel.send({embed});
  })
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bal'],
  permLevel: 0
};

exports.help = {
  name: 'balance',
  description: 'Shows your balance',
  usage: 'balance [@User]'
};
