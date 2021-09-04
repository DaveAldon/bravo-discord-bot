import { BaseCommandInteraction, Message } from 'discord.js';

export default interface Command {
  /**
   * List of aliases for the command.
   * The first name in the list is the primary command name.
   */
  readonly commandNames: string[];
  readonly data?: any;
  // Usage documentation
  help(commandPrefix: string): string;

  // Execute the command
  run(parsedUserCommand: Message): Promise<void>;
  runInteraction(parsedUserCommand: BaseCommandInteraction): Promise<void>;
}
