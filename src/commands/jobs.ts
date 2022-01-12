import { CommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { FirebaseDynamicLinks } from 'firebase-dynamic-links';
import { FIREBASE_WEB_TOKEN } from '../config/secrets';

const firebaseDynamicLinks = new FirebaseDynamicLinks(FIREBASE_WEB_TOKEN);

export const jobs = () => {
  return {
    data: new SlashCommandBuilder()
      .setName('jobs')
      .setDescription('get the latest Bravo job openings.')
      .addStringOption(option =>
        option
          .setName('filter')
          .setDescription('Filters the job search')
          .setRequired(false)
      ),
    async execute(interaction: CommandInteraction) {
      await interaction.reply(
        'https://media1.giphy.com/media/9EmupLytNQLgrQTmxg/giphy.gif?cid=ecf05e479sfd3ukdmrj47p8cff5rx67bsyzzg2wa2fbm0pch&rid=giphy.gif&ct=g'
      );

      const props: IGetJobs = {};
      try {
        props.filter = `${interaction.options.data[0].value}`;
      } catch (e) {}
      // split up the message to bypass the 2k char limit per message
      const messageArray = await getJobs(props);
      if (messageArray.length % 2 > 0) messageArray.push('');
      const half = Math.floor(messageArray.length / 2);
      if (messageArray.length > 1) {
        const firstHalf = messageArray.slice(0, half).join(' ');
        const secondHalf = messageArray.slice(-half).join(' ');
        await interaction.editReply(firstHalf);
        interaction.channel?.send(secondHalf);
      } else {
        await interaction.editReply(messageArray.join(' '));
      }
    },
  };
};

interface IGetJobs {
  filter?: string;
}

const getJobs = async (props: IGetJobs) => {
  const { filter } = props;
  const got = require('got');
  const jsdom = require('jsdom');
  const { JSDOM } = jsdom;

  const url = 'https://www.bravolt.com/careers';
  const response = await got(url);
  const result = async () => {
    const returnMessage: string[] = [
      `Sorry, Bravo doesn't have any job openings${(filter && ` that match **${filter}**`) ||
        ''} right now.`,
    ];

    const dom = new JSDOM(response.body);
    const nodeList = [...dom.window.document.querySelectorAll('a')].filter(isJobLink);

    for (const link of nodeList) {
      // Get the shortened url using dynamic links, but limit the rate to not hit the limit of 5 per second
      await new Promise(resolve => {
        setTimeout(resolve, 100);
      });
      let shortenedLine = await getShortenedUrl(link.href);
      try {
        if (!shortenedLine.includes('https://bravolt.page.link')) {
          shortenedLine = link.href;
        }
      } catch (e) {
        console.log(e);
      }
      const line = `${link.textContent} - ${shortenedLine}\n`;
      if (filter) {
        if (link.textContent.toLowerCase().includes(filter.toLowerCase())) {
          returnMessage.push(line);
        }
      } else {
        returnMessage.push(line);
      }
    }

    if (returnMessage.length > 1) {
      returnMessage[0] = `\n\nBravo is hiring **${returnMessage.length - 1}**${(filter &&
        ` **${filter}**`) ||
        ''} position${returnMessage.length === 2 ? '' : 's'} right now!\n\n`;
    }
    return returnMessage;
  };
  return result();
};

interface ILink {
  href: string | string[];
  textContent: string;
}

const isJobLink = (link: ILink) => {
  if (link.textContent.length <= 1) {
    return false;
  }
  return link.href.includes('.pdf');
};

const getShortenedUrl = async (url: string) => {
  const { shortLink } = await firebaseDynamicLinks.createLink({
    dynamicLinkInfo: {
      domainUriPrefix: 'https://bravolt.page.link',
      link: url,
    },
  });
  return shortLink;
};
