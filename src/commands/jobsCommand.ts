import Command from "./commandInterface";
import { Message } from "discord.js";

export class JobsCommand implements Command {
  commandNames = ["jobs"];

  help(commandPrefix: string): string {
    return `Use ${commandPrefix}${this.commandNames[0]} to get the latest Bravo job openings.`;
  }

  async run(message: Message): Promise<void> {
    await message.reply("we got jobs!");
  }
}