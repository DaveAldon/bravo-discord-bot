import Command from "./commandInterface";
import { Message } from "discord.js";
import { generateHelpMessage } from "./help/generateHelpMessage";

export class HelpCommand implements Command {
    commandNames = ["help"];

    help(commandPrefix: string): string {
        return `\`${commandPrefix}${this.commandNames[0]}\` - get a list of commands and their descriptions.`;
    }

    async run(message: Message): Promise<void> {
        await message.channel.send(generateHelpMessage())
    }
}