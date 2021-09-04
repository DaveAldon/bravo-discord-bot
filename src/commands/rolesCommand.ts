import Command from './commandInterface';
import { CommandInteraction, Message } from 'discord.js';
import { CommandParser } from '../models/commandParser';
import config from '../config/botConfig';
import { rolesAdd } from './roles/rolesAdd';
import { rolesRemove } from './roles/rolesRemove';
import { SlashCommandBuilder } from '@discordjs/builders';

export class RolesCommand implements Command {
  commandNames = ['roles', 'role'];

  help(commandPrefix: string): string {
    return `\`${commandPrefix}${this.commandNames[0]}\` - get a list of skills. React to them as instructed to receive a Discord Role! If you want to remove a role, check out this command: \`!role remove\``;
  }

  public data = new SlashCommandBuilder()
    .setName('roles')
    .setDescription('React to the message to assign skill based roles to yourself.')
    .addStringOption(option =>
      option
        .setName('removal')
        .setDescription('Add a reaction to remove a role')
        .setRequired(false)
        .addChoice('remove', 'true')
    );

  async run(message: Message): Promise<void> {
    const commandParser = new CommandParser(message, config.prefix);
    let commandFilter = '';
    if (commandParser.args.length > 0) {
      commandFilter = commandParser.args[0];
    }
    if (commandFilter === 'remove') {
      message.guild && rolesRemove(message.channel, message.guild);
    } else message.guild && rolesAdd(message.channel, message.guild);
  }

  async runInteraction(interaction: CommandInteraction): Promise<void> {
    interaction.reply('Begin role management:');
    try {
      const filter = `${interaction.options.data[0].value}`;
      if (filter) {
        interaction.channel &&
          interaction.guild &&
          (await rolesRemove(interaction.channel, interaction.guild));
      }
    } catch (error) {
      interaction.channel &&
        interaction.guild &&
        (await rolesAdd(interaction.channel, interaction.guild));
    }
  }
}
