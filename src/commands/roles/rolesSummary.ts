import Discord, { Message } from 'discord.js';
import { onEnd } from './onEnd';
import { getRoleEmojiData } from './roles';
import config from '../../config/botConfig';

export const rolesSummary = async (message: Message) => {
  const { storedRoles, formattedMessage } = getRoleEmojiData();
  const embed = new Discord.MessageEmbed().setTitle('**Top 5 Role Skill Selection**')
    .setDescription(`Add a reaction to this message based on your expertise. See below for which reaction corresponds with the skill. Please keep your selection to a max of 5.
        ${formattedMessage}
        `);

  const msg = message.channel.send({ embeds: [embed] });
  msg.then(async m => {
    for (const role in storedRoles) {
      m.react(role);
    }
  });

  const filter = () => {
    return true; // reaction.emoji.name === '👍'
  };

  const collector = (await msg).createReactionCollector({ filter, time: 60000 * 5 });

  collector.on('collect', (reaction, user) => {
    if (user.id === config.selfId) {
      return;
    }
    const role =
      message.guild &&
      message.guild.roles.cache.find(r => r.id === storedRoles[reaction.emoji.name || ''].roleId);
    const member = message.guild && message.guild.members.cache.get(user.id);
    role && member?.roles.add(role);
  });

  collector.on('end', async collected => {
    (await msg).delete();
    onEnd(message.channel, collected);
  });
};
