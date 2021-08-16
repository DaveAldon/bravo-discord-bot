import { isJobLink } from "./jobsCommand"

describe("jobsCommand", () => {
    test("isJobLink should be false", () => {
        const link = {
            href: "link",
            textContent: "text"
        }
        expect(isJobLink(link)).toBeFalsy()
    })
    test("isJobLink should be true", () => {
        const link = {
            href: "link.pdf",
            textContent: "text"
        }
        expect(isJobLink(link)).toBeTruthy()
    })
})