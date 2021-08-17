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
    return `https://bit.ly/3iQR2F0`
}