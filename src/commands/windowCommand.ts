import Command from './commandInterface';
import { CommandInteraction, Message } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

export class WindowCommand implements Command {
  commandNames = ['bill'];

  help(_commandPrefix: string): string {
    return ``;
  }

  //public data = new SlashCommandBuilder().setName('bill').setDescription(' ');

  async run(message: Message): Promise<void> {
    message.reply(testable());
  }
  async runInteraction(interaction: CommandInteraction): Promise<void> {
    await interaction.reply(testable());
  }
}

export const testable = () => {
  return `https://bit.ly/3iQR2F0`;
};
