import Command from './commandInterface';
import { BaseCommandInteraction, Message } from 'discord.js';
import { randomGreeting } from './greet/randomGreeting';
import { SlashCommandBuilder } from '@discordjs/builders';

export class GreetCommand implements Command {
  commandNames = ['greet', 'hello'];

  public data = new SlashCommandBuilder().setName('greet').setDescription('Get a greeting.');

  help(commandPrefix: string): string {
    return `\`${commandPrefix}greet\` - get a greeting.`;
  }

  async run(message: Message): Promise<void> {
    await message.reply(randomGreeting());
  }

  async runInteraction(interaction: BaseCommandInteraction): Promise<void> {
    await interaction.reply(randomGreeting());
  }
}
