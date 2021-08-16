import { Client, Guild, Message, SnowflakeUtil, TextChannel } from "discord.js";
import { getJobs } from "./jobs/getJobs";
import { isJobLink } from "./jobs/isJobLink";
import { JobsCommand } from "./jobsCommand"
const client = new Client()

describe("jobsCommand", () => {
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
        const result = await getJobs()
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

        const result = await getJobs()
        expect(result).toContain(`Bravo is hiring **1** different positions right now!`)
    })
    test("JobsCommand functions", async () => {
        const JobsCommandClass = new JobsCommand()
        expect(JobsCommandClass.commandNames[0]).toContain("jobs")
    })
    test("JobsCommand help functions", async () => {
        const JobsCommandClass = new JobsCommand()
        expect(JobsCommandClass.help("!")).toEqual("Use !jobs to get the latest Bravo job openings.")
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
        }, textChannel)
        message.reply = mockFn;
        await JobsCommandClass.run(message)
        expect(mockFn).toHaveBeenCalled()
    })
})

