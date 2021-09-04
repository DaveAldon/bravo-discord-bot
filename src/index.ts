import express, { Request, Response } from 'express';
import { Message, Intents, Client } from 'discord.js';
import { DISCORD_TOKEN, CLIENT_ID } from './config/secrets';
import CommandHandler from './commandHandler';
import config from './config/botConfig';
import { registerCommands } from './slashCommands';

const PORT = process.env.PORT || 5000;

const app = express();
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
  presence: {
    status: 'online',
  },
});

//////////////////////////////////////////////////////////////////
//             EXPRESS SERVER SETUP FOR UPTIME ROBOT            //
//////////////////////////////////////////////////////////////////
app.use(express.urlencoded({ extended: true }));

app.use('/', (_request: Request, response: Response) => {
  response.sendStatus(200);
});

const commandHandler = new CommandHandler(config.prefix);

//////////////////////////////////////////////////////////////////
//                    DISCORD CLIENT LISTENERS                  //
//////////////////////////////////////////////////////////////////
// Discord Events: https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-channelCreate

client.once('ready', () => {
  console.log('Bravo Bentley has started!');
  // Only needs to be run once
  //registerCommands(commandHandler);
});
client.on('interactionCreate', (interaction: any) => {
  commandHandler.handleInteraction(interaction);
});
client.on('messageCreate', (message: Message) => {
  commandHandler.handleMessage(message);
});
client.on('error', e => {
  console.error('Discord client error!', e);
});

client.login(DISCORD_TOKEN).then(() => {});
app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));
