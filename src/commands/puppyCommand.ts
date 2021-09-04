import Command from './commandInterface';
import { BaseCommandInteraction, Message } from 'discord.js';
import { getRandomPuppy } from './puppies/getRandomPuppy';
import { SlashCommandBuilder } from '@discordjs/builders';

export class PuppyCommand implements Command {
  commandNames = ['puppy', 'puppies'];

  help(commandPrefix: string): string {
    return `\`${commandPrefix}${this.commandNames[0]}\` - get a random 🐕  gif!`;
  }

  public data = new SlashCommandBuilder().setName('puppy').setDescription('get a random 🐕  gif!');

  async run(message: Message): Promise<void> {
    await message.channel.send(getRandomPuppy());
  }

  async runInteraction(interaction: BaseCommandInteraction): Promise<void> {
    await interaction.reply(getRandomPuppy());
  }
}
