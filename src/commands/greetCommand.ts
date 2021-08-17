import Command from "./commandInterface";
import { Message } from "discord.js";
import { randomGreeting } from "./greet/randomGreeting";

export class GreetCommand implements Command {
  commandNames = ["greet", "hello"];

  help(commandPrefix: string): string {
    return `\`${commandPrefix}greet\` - get a greeting.`;
  }

  async run(message: Message): Promise<void> {
    await message.reply(randomGreeting());
  }
}
