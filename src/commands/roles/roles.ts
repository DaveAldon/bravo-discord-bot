export enum roleIDs {
    "C#" = "879811934638207037",
    Java = "879812138846273617",
    Angular = "879812164649627748",
    React = "879812198606733403",
    "React-Native" = "879812222778474537",
    Python = "879812247323566131",
    SQL = "879812265635876964",
    Scrum = "879812282903834684",
    DevOps = "879812301673365564",
    AWS = "879812323102056508",
    Azure = "879812342915956807",
    GCP = "879812371634352230",
    Go = "879812389493694484",
    Terraform = "879812407038464040",
}

const emoji = [
    "🔴",
    "🟤",
    "🟢",
    "🔵",
    "🟡",
    "⚪",
    "🟠",
    "🟣",
    "🟦",
    "🟩",
    "🟥",
    "🟧",
    "🔳",
    "🆒"
]

interface IRoleOutput {
    [key: string]: {
        roleId?: string;
        roleName?: string;
    }
}
const emojiRoles = () => {
    const output: IRoleOutput = {}
    const ids = Object.values(roleIDs)
    const names = Object.keys(roleIDs)
    emoji.forEach((value, i) => {
        output[value] = {
            roleId: ids[i],
            roleName: names[i]
        }
    })
    return output
}

const getLegend = (storedRoles: IRoleOutput) => {
    let roleStringList = ""
    for (const output in storedRoles) {
        roleStringList += `\n\n${output} - ${storedRoles[output].roleName}`
    }
    return roleStringList
}

export const getRoleEmojiData = () => {
    const storedRoles = emojiRoles()
    const formattedMessage = getLegend(storedRoles)
    return {
        storedRoles,
        formattedMessage
    }
}