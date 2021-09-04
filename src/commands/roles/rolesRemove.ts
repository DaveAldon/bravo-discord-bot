import Discord, { Guild, TextBasedChannels } from 'discord.js';
import config from '../../config/botConfig';
import { onEnd } from './onEnd';
import { getRoleEmojiData } from './roles';

export const rolesRemove = async (channel: TextBasedChannels, guild: Guild) => {
  const { storedRoles, formattedMessage } = getRoleEmojiData();
  const embed = new Discord.MessageEmbed().setTitle('**Skill Removal**')
    .setDescription(`Add a reaction to this message based on the expertise you'd like to remove. See below for which reaction corresponds with the skill.
        ${formattedMessage}
        `);

  const msg = channel.send({ embeds: [embed] });
  msg.then(async m => {
    for (const role in storedRoles) {
      m.react(role);
    }
  });

  const filter = () => {
    return true;
  };

  const collector = (await msg).createReactionCollector({ filter, time: 60000 * 5 });

  collector.on('collect', (reaction, user) => {
    if (user.id === config.selfId) {
      return;
    }

    const role = guild.roles.cache.find(
      r => r.id === storedRoles[reaction.emoji.name || ''].roleId
    );
    const member = guild.members.cache.get(user.id);
    role && member?.roles.remove(role);
  });

  collector.on('end', async collected => {
    (await msg).delete();
    onEnd(channel, collected);
  });
};
