import dotenv from 'dotenv';

dotenv.config({ path: '.env' });
export const CLIENT_ID = '876206083461505025';
export const DISCORD_TOKEN = process.env['token'];

if (!DISCORD_TOKEN) {
  console.error("No 'discord token' provided in .env file.");
}
