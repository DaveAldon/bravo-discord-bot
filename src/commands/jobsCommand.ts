import Command from "./commandInterface";
import { Message } from "discord.js";
import { getJobs } from "./jobs/getJobs";

export class JobsCommand implements Command {
    commandNames = ["jobs", "job"];

    help(commandPrefix: string): string {
        return `Use ${commandPrefix}${this.commandNames[0]} to get the latest Bravo job openings.`;
    }

    async run(message: Message): Promise<void> {
        message.reply(await getJobs())
    }
}