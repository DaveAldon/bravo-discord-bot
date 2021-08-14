"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DISCORD_TOKEN = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: ".env" });
exports.DISCORD_TOKEN = process.env["token"];
if (!exports.DISCORD_TOKEN) {
    console.error("No 'discord token' provided in .env file.");
}
