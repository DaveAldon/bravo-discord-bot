import dotenv from 'dotenv';

dotenv.config({ path: '.env' });
export const CLIENT_ID = '876206083461505025';
export const DISCORD_TOKEN = process.env['token'] || 'nothing';
export const OWNER = '197352387755638794';
export const BOT_NAME = 'Bentley';

if (DISCORD_TOKEN === 'nothing') {
  console.error("No 'discord token' provided in .env file.");
}
