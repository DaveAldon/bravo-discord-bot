import { Client, Guild, Message, SnowflakeUtil, TextChannel } from "discord.js";
import { getJobs } from "./jobs/getJobs";
import { isJobLink } from "./jobs/isJobLink";
import { JobsCommand } from "./jobsCommand"
import { GreetCommand } from "./greetCommand";
import { randomGreeting } from "./greet/randomGreeting";
import { generateHelpMessage } from "./help/generateHelpMessage";
import { HelpCommand } from "./helpCommand";
import { getRandomPuppy } from "./puppies/getRandomPuppy";
import { PuppyCommand } from "./puppyCommand";
import { WindowCommand, testable } from "./windowCommand";
import config from "../config/botConfig";

describe("jobsCommand", () => {
    const client = new Client()
    beforeEach(() => {
        jest.resetModules();
    });
    afterAll(() => client.destroy());

    test("isJobLink should be false", () => {
        const link = {
            href: "link",
            textContent: "text"
        }
        expect(isJobLink(link)).toBeFalsy()
        const undefinedLink = {
            href: "link",
            textContent: "t"
        }
        expect(isJobLink(undefinedLink)).toBeFalsy()
    })
    test("isJobLink should be true", () => {
        const link = {
            href: "link.pdf",
            textContent: "text"
        }
        expect(isJobLink(link)).toBeTruthy()
    })
    test("getJobs should return failure message", async () => {
        jest.mock('got', () => {
            return jest.fn((_url: string) => {
                return {
                    body: "blah"
                }
            })
        });
        const result = await getJobs({})
        expect(result).toEqual("Sorry, Bravo doesn't have any job openings right now.")
    })
    test("getJobs should return a properly parsed message", async () => {
        jest.mock('got', () => {
            return jest.fn((_url: string) => {
                return {
                    body: '<li style="font-size:16px; line-height:1.9em"><p class="font_8" style="font-size:16px; line-height:1.9em"><a href="https://14e6c56a-7329-4e06-91b1-c2ab03444eb2.filesusr.com/ugd/090ee0_8f7585dbfa59483eb833434828b18148.pdf" target="_blank"><span style="font-size:16px"><span class="color_11"><span style="text-decoration:underline;">Agile Business Analyst</span></span></span></a></p></li>'
                }
            })
        });

        const result = await getJobs({})
        expect(result).toContain(`Bravo is hiring **1** position right now!`)
        const resultFilter = await getJobs({ filter: "Agile" })
        expect(resultFilter).toContain(`Bravo is hiring **1** **Agile** position right now!`)
    })
    test("getJobs should return a properly parsed plural message", async () => {
        jest.mock('got', () => {
            return jest.fn((_url: string) => {
                return {
                    body: '<li style="font-size:16px; line-height:1.9em"><p class="font_8" style="font-size:16px; line-height:1.9em"><a href="https://14e6c56a-7329-4e06-91b1-c2ab03444eb2.filesusr.com/ugd/090ee0_8f7585dbfa59483eb833434828b18148.pdf" target="_blank"><span style="font-size:16px"><span class="color_11"><span style="text-decoration:underline;">Agile Business Analyst</span></span></span></a></p></li><li style="font-size:16px; line-height:1.9em"><p class="font_8" style="font-size:16px; line-height:1.9em"><a href="https://14e6c56a-7329-4e06-91b1-c2ab03444eb2.filesusr.com/ugd/090ee0_8f7585dbfa59483eb833434828b18148.pdf" target="_blank"><span style="font-size:16px"><span class="color_11"><span style="text-decoration:underline;">Agile Business Analyst</span></span></span></a></p></li>'
                }
            })
        });

        const result = await getJobs({})
        expect(result).toContain(`Bravo is hiring **2** positions right now!`)
        const resultFilter = await getJobs({ filter: "Agile" })
        expect(resultFilter).toContain(`Bravo is hiring **2** **Agile** positions right now!`)
    })
    test("JobsCommand functions", async () => {
        const JobsCommandClass = new JobsCommand()
        expect(JobsCommandClass.commandNames[0]).toContain("jobs")
    })
    test("JobsCommand help functions", async () => {
        const JobsCommandClass = new JobsCommand()
        expect(JobsCommandClass.help(config.prefix)).toContain("- get the latest Bravo job openings.")
    })
    test("JobsCommand run functions", async () => {
        const mockFn = jest.fn()
        jest.mock('./jobs/getJobs', () => {
            return {
                getJobs: mockFn
            }
        });

        const JobsCommandClass = new JobsCommand()
        const guild = new Guild(client, {
            id: SnowflakeUtil.generate(),
        });
        const textChannel = new TextChannel(guild, {})
        const message = new Message(client, {
            id: "message-id",
            content: "!jobs Senior"
        }, textChannel)
        message.reply = mockFn;
        await JobsCommandClass.run(message)
        expect(mockFn).toHaveBeenCalledTimes(1)

        const messageNoFilter = new Message(client, {
            id: "message-id",
            content: "!jobs"
        }, textChannel)
        messageNoFilter.reply = mockFn;
        await JobsCommandClass.run(messageNoFilter)
        expect(mockFn).toHaveBeenCalledTimes(2)

        const wrongMessage = new Message(client, {
            id: "message-id",
            content: ""
        }, textChannel)
        wrongMessage.reply = mockFn;
        await JobsCommandClass.run(wrongMessage)
        expect(mockFn).toHaveBeenCalledTimes(3)
    })
})

describe("greetCommand", () => {
    const client = new Client()
    beforeEach(() => {
        jest.resetModules();
    });
    afterAll(() => client.destroy());

    test("randomGreeting gives a greeting", async () => {
        const result = randomGreeting()
        expect(result).toContain(config.prefix)
    })

    test("GreetCommand help functions", async () => {
        const GreetCommandClass = new GreetCommand()
        expect(GreetCommandClass.help(config.prefix)).toContain("- get a greeting.")
    })

    test("GreetCommand run functions", async () => {
        const mockFn = jest.fn()
        jest.mock('./greet/randomGreeting', () => {
            return {
                randomGreeting: mockFn
            }
        });

        const GreetCommandClass = new GreetCommand()
        const guild = new Guild(client, {
            id: SnowflakeUtil.generate(),
        });
        const textChannel = new TextChannel(guild, {})
        const message = new Message(client, {
            id: "message-id",
        }, textChannel)
        message.reply = mockFn;
        await GreetCommandClass.run(message)
        expect(mockFn).toHaveBeenCalled()
    })
})

describe("HelpCommand", () => {
    const client = new Client()
    beforeEach(() => {
        jest.resetModules();
    });
    afterAll(() => client.destroy());

    test("HelpCommand gives a help page", async () => {
        const result = generateHelpMessage()
        expect(result).toContain("Here is a list of commands that I currently support")
    })

    test("HelpCommand help functions", async () => {
        const GreetCommandClass = new HelpCommand()
        expect(GreetCommandClass.help(config.prefix)).toContain("- get a list of commands and their descriptions.")
    })

    test("HelpCommand run functions", async () => {
        await new Promise((r) => setTimeout(r, 2000));
        const mockFn = jest.fn()
        jest.mock('./help/generateHelpMessage', () => {
            return {
                generateHelpMessage: mockFn
            }
        });

        const HelpCommandClass = new HelpCommand()
        const guild = new Guild(client, {
            id: SnowflakeUtil.generate(),
        });
        const textChannel = new TextChannel(guild, {})
        const message = new Message(client, {
            id: "message-id",
        }, textChannel)
        message.channel.send = mockFn;
        await HelpCommandClass.run(message)
        expect(mockFn).toHaveBeenCalled()
    })
})

describe("PuppyCommand", () => {
    const client = new Client()
    beforeEach(() => {
        jest.resetModules();
    });
    afterAll(() => client.destroy());

    test("PuppyCommand getRandomPuppy functions", async () => {
        const result = getRandomPuppy()
        expect(typeof result).toEqual("string")
    })

    test("PuppyCommand gives a help page", async () => {
        const PuppyCommandClass = new PuppyCommand()
        expect(PuppyCommandClass.help(config.prefix)).toContain("- get a random 🐕  gif!")
    })

    test("PuppyCommand run functions", async () => {
        await new Promise((r) => setTimeout(r, 2000));
        const mockFn = jest.fn()
        jest.mock('./puppies/getRandomPuppy', () => {
            return {
                getRandomPuppy: mockFn
            }
        });

        const PuppyCommandClass = new PuppyCommand()
        const guild = new Guild(client, {
            id: SnowflakeUtil.generate(),
        });
        const textChannel = new TextChannel(guild, {})
        const message = new Message(client, {
            id: "message-id",
        }, textChannel)
        message.channel.send = mockFn;
        await PuppyCommandClass.run(message)
        expect(mockFn).toHaveBeenCalled()
    })
})

describe("WindowCommand", () => {
    const client = new Client()
    beforeEach(() => {
        jest.resetModules();
    });
    afterAll(() => client.destroy());

    test("WindowCommand run functions", async () => {
        await new Promise((r) => setTimeout(r, 2000));
        const mockFn = jest.fn()
        jest.mock('./windowCommand', () => {
            const actual = jest.requireActual('./windowCommand')
            return {
                ...actual,
                testable: mockFn
            }
        });

        const WindowCommandClass = new WindowCommand()
        const guild = new Guild(client, {
            id: SnowflakeUtil.generate(),
        });
        const textChannel = new TextChannel(guild, {})
        const message = new Message(client, {
            id: "message-id",
        }, textChannel)
        message.channel.send = mockFn;
        await WindowCommandClass.run(message)
        expect(mockFn).toHaveBeenCalled()
    })
    test("WindowCommand help functions", async () => {
        const WindowCommandClass = new WindowCommand()
        expect(WindowCommandClass.help(config.prefix)).toEqual("")
    })
    test("testable functions", async () => {
        expect(testable().length).toBeGreaterThan(0)
    })
})