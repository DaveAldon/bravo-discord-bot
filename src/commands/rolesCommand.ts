import Command from "./commandInterface";
import { Message } from "discord.js";
import { CommandParser } from "../models/commandParser";
import config from "../config/botConfig"
import { rolesAdd } from "./roles/rolesAdd"
import { rolesRemove } from "./roles/rolesRemove"

export class RolesCommand implements Command {
    commandNames = ["roles", "role"];

    help(commandPrefix: string): string {
        return `\`${commandPrefix}${this.commandNames[0]}\` - get a list of skills. React to them as instructed to receive a Discord Role! If you want to remove a role, check out this command: \`!role remove\``;
    }

    async run(message: Message): Promise<void> {
        const commandParser = new CommandParser(message, config.prefix);
        let commandFilter = "";
        if (commandParser.args.length > 0) {
            commandFilter = commandParser.args[0]
        }
        if (commandFilter === "remove") {
            rolesRemove(message);
        } else rolesAdd(message);
    }
}