interface ILink {
    href: string | string[];
    textContent: string;
}

export const isJobLink = (link: ILink) => {
    if (link.textContent.length <= 1) { return false }
    return link.href.includes('.pdf');
};