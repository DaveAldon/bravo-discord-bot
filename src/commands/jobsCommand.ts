import Command from "./commandInterface";
import { Message } from "discord.js";

export class JobsCommand implements Command {
    commandNames = ["jobs"];

    help(commandPrefix: string): string {
        return `Use ${commandPrefix}${this.commandNames[0]} to get the latest Bravo job openings.`;
    }

    async run(message: Message): Promise<void> {
        //await message.reply("we got jobs!");
        message.reply(await getJobs())
    }
}

interface ILink {
    href: string | string[];
    textContent: string;
}

const getJobs = async () => {
    const got = require('got');
    const jsdom = require("jsdom");
    const { JSDOM } = jsdom;

    const vgmUrl = "https://www.bravolt.com/careers";

    const isJobLink = (link: ILink) => {
        if (typeof link.href === 'undefined') { return false }
        if (link.textContent.length <= 1) { return false }
        return link.href.includes('.pdf');
    };

    const result = async () => {
        let returnMessage = "";
        const response = await got(vgmUrl);
        const dom = new JSDOM(response.body);
        const nodeList = [...dom.window.document.querySelectorAll('a')];

        nodeList.filter(isJobLink).forEach(link => {
            returnMessage += `${link.textContent} - ${link.href}\n`;
        });
        return returnMessage;
    }
    return result();
}