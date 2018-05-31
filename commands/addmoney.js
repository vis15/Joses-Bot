var money = require('discord-money');
const {parseUser} = require('../util/parseUser.js');
const {RichEmbed} = require('discord.js');

exports.run = (client, message, args) => {
  const user = message.mentions.users.first();
  
  let num = 0;
  
  if (message.mentions.users.size < 1)
  {
  		num = args[0];
  		money.updateBal(message.author.id, num).then((i) => { // money.fetchBal grabs the userID, finds it, and puts it into 'i'.
  				const embed = new RichEmbed()
  				.setColor(0x36c41f)
  				.setDescription(`Addded **$${num}**\nYour New Balance **$${i.money}**`);
  				return message.channel.send({embed});
        })
        return;
  }
  
  num = args[1];
  
  money.updateBal(user.id, num).then((i) => { // money.fetchBal grabs the userID, finds it, and puts it into 'i'.
  		const embed = new RichEmbed()
  		.setColor(0x36c41f)
  		.setDescription(`Addded **$${num}**\n${user.tag} New Balance **$${i.money}**`);
  		return message.channel.send({embed});
  })
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'addmoney',
  description: 'Gives money to the user, admin only',
  usage: 'addmoney [@User]'
};
