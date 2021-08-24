import Discord, { Message } from "discord.js";
import config from "../../config/botConfig";
import { onEnd } from "./onEnd";
import { getRoleEmojiData } from "./roles";

export const rolesRemove = async (message: Message) => {
    const { storedRoles, formattedMessage } = getRoleEmojiData()
    const embed = new Discord.MessageEmbed()
        .setTitle("**Skill Removal**")
        .setDescription(`Add a reaction to this message based on the expertise you'd like to remove. See below for which reaction corresponds with the skill.
        ${formattedMessage}
        `)

    const msg = message.channel.send(embed);

    msg.then(async (m) => {
        for (const role in storedRoles) {
            m.react(role)
        }
    })

    const filter = (_reaction: { emoji: { name: string; }; }) => {
        return true
    };

    const collector = (await msg).createReactionCollector(filter, { time: 60000 * 5 });

    collector.on('collect', (reaction, user) => {
        if (user.id === config.selfId) {
            return
        }
        const role = message.guild && message.guild.roles.cache.find(r => r.id === storedRoles[reaction.emoji.name].roleId);
        const member = message.guild && message.guild.member(user);
        role && member?.roles.remove(role);
    });

    collector.on('end', _collected => {
        onEnd(message);
    });
}