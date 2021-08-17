import Command from "./commandInterface";
import { Message } from "discord.js";
import { getRandomPuppy } from "./puppies/getRandomPuppy";

export class PuppyCommand implements Command {
    commandNames = ["puppy", "puppies"];

    help(commandPrefix: string): string {
        return `\`${commandPrefix}${this.commandNames[0]}\` - get a random 🐕  gif!`;
    }

    async run(message: Message): Promise<void> {
        await message.channel.send(getRandomPuppy())
    }
}