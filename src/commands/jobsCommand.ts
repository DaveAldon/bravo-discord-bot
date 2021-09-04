import Command from './commandInterface';
import { CommandInteraction, Message } from 'discord.js';
import { getJobs, IGetJobs } from './jobs/getJobs';
import { CommandParser } from '../models/commandParser';
import config from '../config/botConfig';
import { SlashCommandBuilder } from '@discordjs/builders';

export class JobsCommand implements Command {
  commandNames = ['jobs', 'job'];

  help(commandPrefix: string): string {
    return `\`${commandPrefix}${this.commandNames[0]}\` - get the latest Bravo job openings. You can also add a job filter like this: \`!jobs senior\``;
  }

  public data = new SlashCommandBuilder()
    .setName('jobs')
    .setDescription('get the latest Bravo job openings.')
    .addStringOption(option =>
      option
        .setName('filter')
        .setDescription('Filters the job search')
        .setRequired(false)
    );

  async run(message: Message): Promise<void> {
    const commandParser = new CommandParser(message, config.prefix);
    const props: IGetJobs = {};
    if (commandParser.args.length > 0) {
      props.filter = commandParser.args[0];
    }
    message.reply(await getJobs(props));
  }

  async runInteraction(interaction: CommandInteraction): Promise<void> {
    const props: IGetJobs = {};
    try {
      props.filter = `${interaction.options.data[0].value}`;
    } catch (e) {}
    await interaction.reply(await getJobs(props));
  }
}
