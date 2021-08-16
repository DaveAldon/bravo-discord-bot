import { isJobLink } from "./isJobLink";

export const getJobs = async () => {
    const got = require('got');
    const jsdom = require("jsdom");
    const { JSDOM } = jsdom;

    const url = "https://www.bravolt.com/careers";

    const result = async () => {
        let returnMessage = "";
        const response = await got(url);
        const dom = new JSDOM(response.body);
        const nodeList = [...dom.window.document.querySelectorAll('a')].filter(isJobLink)

        nodeList.forEach(link => {
            returnMessage += `${link.textContent} - ${link.href}\n`;
        });
        if (returnMessage.length <= 1) {
            returnMessage = "Sorry, Bravo doesn't have any job openings right now.";
        } else {
            returnMessage = `\n\nBravo is hiring **${nodeList.length}** different positions right now!\n\n${returnMessage}`;
        }
        return returnMessage;
    }
    return result();
}