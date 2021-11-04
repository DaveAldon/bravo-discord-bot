import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { DISCORD_TOKEN, CLIENT_ID } from '../config/secrets';
//@index(['../commands/**/*.ts(x)?','!**/*.*.*'], f => `import { ${f.name} } from '${f.path}';`)
import { bill } from '../commands/bill';
import { greet } from '../commands/greet';
import { jobs } from '../commands/jobs';
import { puppy } from '../commands/puppy';
import { roles } from '../commands/roles';
//@endindex

interface IResponse {
  id: string;
  application_id: string;
  name: string;
  description: string;
  version: string;
  default_permission: boolean;
  type: number;
  guild_id: string;
}

const restClient = () => {
  return new REST({ version: '9' }).setToken(DISCORD_TOKEN);
};

export const deleteCommands = async (GUILD_ID: string, name: string) => {
  const rest = restClient();
  try {
    const response = (await rest.get(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID)
    )) as Array<IResponse>;

    response.forEach(async command => {
      if (command.name === name) {
        await rest.delete(Routes.applicationGuildCommand(CLIENT_ID, GUILD_ID, command.id));
      }
    });
  } catch (error) {
    console.error(error);
  }
};

export const deployCommands = async (GUILD_ID: string) => {
  const rest = restClient();
  const commands: any[] = [];

  //@index(['../commands/**/*.ts(x)?','!**/*.*.*'], f => `commands.push(${f.name}().data.toJSON());`)
  commands.push(bill().data.toJSON());
  commands.push(greet().data.toJSON());
  commands.push(jobs().data.toJSON());
  commands.push(puppy().data.toJSON());
  commands.push(roles().data.toJSON());
  //@endindex

  try {
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    });
  } catch (error) {
    console.error(error);
  }
};
