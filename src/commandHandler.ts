import { BaseCommandInteraction, Message } from 'discord.js';
import { HelpCommand } from './commands/helpCommand';
import { GreetCommand, JobsCommand, PuppyCommand } from './commands';
import Command from './commands/commandInterface';
import { CommandParser } from './models/commandParser';
import { WindowCommand } from './commands/windowCommand';
import { RolesCommand } from './commands/rolesCommand';

export default class CommandHandler {
  public commands: Command[];
  private readonly prefix: string;

  constructor(prefix: string) {
    const commandClasses = [
      GreetCommand,
      JobsCommand,
      HelpCommand,
      PuppyCommand,
      WindowCommand,
      RolesCommand,
    ];
    this.commands = commandClasses.map(commandClass => {
      return new commandClass();
    });
    this.prefix = prefix;
  }

  async handleInteraction(interaction: BaseCommandInteraction): Promise<void> {
    const { commandName } = interaction;
    if (!interaction.isCommand()) return;

    const matchedCommand = this.commands.find(command =>
      command.commandNames.includes(commandName)
    );

    if (matchedCommand) {
      await matchedCommand.runInteraction(interaction).catch(error => {
        interaction.reply(`${interaction.commandName} failed because of ${error}`);
      });
    }
  }

  // Executes user commands contained in a message if appropriate
  async handleMessage(message: Message): Promise<void> {
    if (message.author.bot || !this.isCommand(message)) {
      return;
    }
    const commandParser = new CommandParser(message, this.prefix);
    const matchedCommand = this.commands.find(command =>
      command.commandNames.includes(commandParser.parsedCommandName)
    );

    if (!matchedCommand) {
      // Disabled for now, it sends too many messages that aren't meant to be commands
      //await message.reply(`I don't recognize that command. Try !help.`);
    } else {
      await matchedCommand.run(message).catch(error => {
        message.reply(`'${this.echoMessage(message)}' failed because of ${error}`);
      });
    }
  }

  // Sends back the message content after removing the prefix
  echoMessage(message: Message): string {
    return message.content.replace(this.prefix, '').trim();
  }

  // Determines whether or not a message is a user command
  private isCommand(message: Message): boolean {
    return message.content.startsWith(this.prefix);
  }
}
