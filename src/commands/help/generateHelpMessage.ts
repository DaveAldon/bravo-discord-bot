import { PuppyCommand } from "../puppyCommand"
import { GreetCommand } from "../greetCommand"
import { HelpCommand } from "../helpCommand"
import { JobsCommand } from "../jobsCommand"
import { RolesCommand } from "../rolesCommand"
import config from "../../config/botConfig"

export const generateHelpMessage = (): string => {
    let returnMessage = `Here is a list of commands that I currently support, and their descriptions:\n\n`
    returnMessage += `${new JobsCommand().help(config.prefix)}\n`
    returnMessage += `${new GreetCommand().help(config.prefix)}\n`
    returnMessage += `${new PuppyCommand().help(config.prefix)}\n`
    returnMessage += `${new RolesCommand().help(config.prefix)}\n`
    returnMessage += `${new HelpCommand().help(config.prefix)}`
    return returnMessage;
}