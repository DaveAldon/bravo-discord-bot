import { CommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

export const bill = () => {
  return {
    data: new SlashCommandBuilder().setName('bill').setDescription(' '),
    async execute(interaction: CommandInteraction) {
      await interaction.reply(testable());
    },
  };
};

export const testable = () => {
  return `https://bit.ly/3iQR2F0`;
};
