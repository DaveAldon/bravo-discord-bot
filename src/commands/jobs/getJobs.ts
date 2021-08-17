import { isJobLink } from "./isJobLink";

export interface IGetJobs {
    filter?: string;
}

export const getJobs = async (props: IGetJobs) => {
    const { filter } = props
    const got = require('got');
    const jsdom = require("jsdom");
    const { JSDOM } = jsdom;

    const url = "https://www.bravolt.com/careers";

    const result = async () => {
        const returnMessage: string[] = [`Sorry, Bravo doesn't have any job openings${filter && ` that match **${filter}**` || ""} right now.`];
        const response = await got(url);
        const dom = new JSDOM(response.body);
        const nodeList = [...dom.window.document.querySelectorAll('a')].filter(isJobLink)

        nodeList.forEach(link => {
            const line = `${link.textContent} - ${link.href}\n`;
            if (filter) {
                if (link.textContent.toLowerCase().includes(filter.toLowerCase())) {
                    returnMessage.push(line)
                }
            } else {
                returnMessage.push(line)
            }
        });
        if (returnMessage.length > 1) {
            returnMessage[0] = `\n\nBravo is hiring **${returnMessage.length - 1}**${filter && ` **${filter}**` || ""} position${returnMessage.length === 2 ? "" : "s"} right now!\n\n`
        }
        return returnMessage.join('');
    }
    return result();
}