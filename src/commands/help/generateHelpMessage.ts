import { PuppyCommand } from "../puppyCommand"
import { GreetCommand } from "../greetCommand"
import { HelpCommand } from "../helpCommand"
import { JobsCommand } from "../jobsCommand"

export const generateHelpMessage = (): string => {
    const commandPrefix = "!"
    let returnMessage = `Here is a list of commands that I currently support, and their descriptions:\n\n`
    returnMessage += `${new JobsCommand().help(commandPrefix)}\n`
    returnMessage += `${new GreetCommand().help(commandPrefix)}\n`
    returnMessage += `${new PuppyCommand().help(commandPrefix)}\n`
    returnMessage += `${new HelpCommand().help(commandPrefix)}`
    return returnMessage;
}