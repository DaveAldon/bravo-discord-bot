import { CommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

export const greet = () => {
  return {
    data: new SlashCommandBuilder().setName('greet').setDescription('Get a greeting.'),
    async execute(interaction: CommandInteraction) {
      await interaction.reply(randomGreeting());
    },
  };
};

const randomGreeting = () => {
  const options = ['hello', 'howdy', 'hey', 'hi', 'salutations', 'greetings', 'sup', 'yo'];
  const i = Math.floor(Math.random() * options.length);
  return `${options[i]}!`;
};
