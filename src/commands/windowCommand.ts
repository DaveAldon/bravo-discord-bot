import Command from "./commandInterface";
import { Message } from "discord.js";

export class WindowCommand implements Command {
    commandNames = ["bill"];

    help(_commandPrefix: string): string {
        return ``;
    }

    async run(message: Message): Promise<void> {
        message.reply(testable())
    }
}

export const testable = () => {
    return `https://github.com/DaveAldon/bravo-discord-bot/blob/main/repoResources/onlineScreenshot.png`
}