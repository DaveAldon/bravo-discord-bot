import { CommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { puppyIds } from '../functions/puppyIds';

export const puppy = () => {
  return {
    data: new SlashCommandBuilder().setName('puppy').setDescription('get a random 🐕  gif!'),
    async execute(interaction: CommandInteraction) {
      await interaction.reply(getRandomPuppy());
    },
  };
};

export const getRandomPuppy = () => {
  const url = 'https://openpuppies.com/mp4/';
  const i = Math.floor(Math.random() * puppyIds.length);
  const randomPuppy = puppyIds[i];
  return `${url}${randomPuppy}.mp4`;
};
