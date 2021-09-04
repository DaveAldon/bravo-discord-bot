import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import CommandHandler from './commandHandler';
import { DISCORD_TOKEN, CLIENT_ID } from './config/secrets';

export const registerCommands = (commandHandler: CommandHandler) => {
  const rest = new REST({ version: '9' }).setToken(DISCORD_TOKEN || '');
  const commands: any[] = [];
  commandHandler.commands.forEach(command => {
    command.data && commands.push(command.data.toJSON());
  });
  (async () => {
    try {
      //await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
      await rest.put(Routes.applicationGuildCommands(CLIENT_ID, '844365328574054420'), {
        body: commands,
      });
    } catch (error) {
      console.error(error);
    }
  })();
};
