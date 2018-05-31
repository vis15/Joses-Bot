const {RichEmbed} = require('discord.js');
const {caseNumber} = require('../util/caseNumber.js');
const {parseUser} = require('../util/parseUser.js');
const settings = require('../settings.json');
exports.run = async (client, message, args) => {
  const user = message.mentions.users.first();
  parseUser(message, user);
  //const modlog = client.channels.find('name', 'mod-log');
  //const caseNum = await caseNumber(client, modlog);
  const muteRole = client.guilds.get(message.guild.id).roles.find('name', 'muted');
  //if (!modlog) return message.reply('I cannot find a mod-log channel').catch(console.error);
  if (!muteRole) return message.reply('I cannot find a mute role').catch(console.error);
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to mute them.').catch(console.error);
  const reason = args.splice(1, args.length).join(' ') || `No Reason.`;

  if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('I do not have the correct permissions.').catch(console.error);

  if (message.guild.member(user).roles.has(muteRole.id)) {
  	  const embed = new RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setDescription(`**Action:** Unmuted\n**Target:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`);
    message.guild.member(user).removeRole(muteRole).then(() => {
      message.channel.send({embed}).catch(console.error);
    });
  } else {
  	const embed = new RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setDescription(`**Action:** Muted\n**Target:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`);
    message.guild.member(user).addRole(muteRole).then(() => {
      message.channel.send({embed}).catch(console.error);
    });
  }

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['unmute'],
  permLevel: 2
};

exports.help = {
  name: 'mute',
  description: 'mutes or unmutes a mentioned user',
  usage: 'mute @User [reason]'
};
