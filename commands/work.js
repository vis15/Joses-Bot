var money = require('discord-money');
const {RichEmbed} = require('discord.js');

exports.run = (client, message, args) => {
  
  num = Math.floor(Math.random() * 1500) + 100;
  
  var work = [
  	"working hard",
  	"getting apples",
  	"selling pizza",
  	"deliving pizza",
  	"selling penguins",
  	"selling apples",
  	"deliving penguins",
  	"fixing cars",
  	"working on cars",
  	"cleaning cars",
  	"doing homework",
    "making YouTube videos",
  ];
  
  var item = work[Math.floor(Math.random()*work.length)];
  
  money.updateBal(message.author.id, num).then((i) => { // money.fetchBal grabs the userID, finds it, and puts it into 'i'.
  		const embed = new RichEmbed()
  		.setColor(0x36c41f)
  		.setDescription(`Congrats you Earned **$${num}** ${message.author} by ${item}\nNew Balance **$${i.money}**`);
  		return message.channel.send({embed});
  })
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'work',
  description: 'Gives money to the user',
  usage: 'work'
};
