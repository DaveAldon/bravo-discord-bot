import Command from './commandInterface';
import { CommandInteraction, Message } from 'discord.js';
import { generateHelpMessage } from './help/generateHelpMessage';
import { SlashCommandBuilder } from '@discordjs/builders';

export class HelpCommand implements Command {
  commandNames = ['help'];

  help(commandPrefix: string): string {
    return `\`${commandPrefix}${this.commandNames[0]}\` - get a list of commands and their descriptions.`;
  }

  public data = new SlashCommandBuilder()
    .setName('help')
    .setDescription('get a list of commands and their descriptions.');

  async run(message: Message): Promise<void> {
    await message.channel.send(generateHelpMessage());
  }

  async runInteraction(interaction: CommandInteraction): Promise<void> {
    await interaction.reply(generateHelpMessage());
  }
}
