import Command from "./commandInterface";
import { Message } from "discord.js";
import { getJobs, IGetJobs } from "./jobs/getJobs";
import { CommandParser } from "../models/commandParser";
import config from "../config/botConfig"

export class JobsCommand implements Command {
    commandNames = ["jobs", "job"];

    help(commandPrefix: string): string {
        return `\`${commandPrefix}${this.commandNames[0]}\` - get the latest Bravo job openings. You can also add a job filter like this: \`!jobs senior\``;
    }

    async run(message: Message): Promise<void> {
        const commandParser = new CommandParser(message, config.prefix);
        const props: IGetJobs = {}
        if (commandParser.args.length > 0) {
            props.filter = commandParser.args[0]
        }
        message.reply(await getJobs(props))
    }
}