import Discord, { Message } from "discord.js";

export const onEnd = (message: Message, _collected: { size: number; }) => {
    const commandString = "`!roles`"
    const removeCommandString = "`!roles remove`"
    const outputEmbed = new Discord.MessageEmbed()
        .setTitle("**Role Removal Ended**")
        .setDescription(`If you'd like to add a skill based role to your account, run the ${commandString} command and follow the instructions.
            \nIf you'd like to remove a skill based role from your account, run the ${removeCommandString} command and follow the instructions.`)
    message.channel.send(outputEmbed);
}