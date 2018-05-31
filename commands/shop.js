var money = require('discord-money');
const {parseUser} = require('../util/parseUser.js');
const {RichEmbed} = require('discord.js');
const shop = require('../util/theshop.js');

exports.run = (client, message, args) => {
  const command = args[0];
  
  if(command === 'add')
  {
  	if(!args[1] || !args[2] || !args[3])
  	{
  		message.channel.send("The command is: shop add itemName itemCost itemDescription");
  		return;
  	}
  	
  	shop.add(args[1], args[2], args[3]);
  	
  	const embed = new RichEmbed()
  		.setColor(0x36c41f)
  		.setDescription(`Addded **${args[1]}**\n${args[3]}\nCost **${args[2]}**`);
  		return message.channel.send({embed});
  	return;
  }
  
  shop.info().then((msg) => { 
    	const embed = new RichEmbed()
  		.setColor(0x36c41f)
  		.setDescription(`${msg}`)
  		.setTitle("Shop Items");
  		return message.channel.send({embed});
  });
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'shop',
  description: 'in development',
  usage: 'shop'
};
