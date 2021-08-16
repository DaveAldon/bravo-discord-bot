export const randomGreeting = () => {
    const options = ["hello", "howdy", "hey", "hi", "salutations", "greetings", "sup", "yo"]
    const i = Math.floor(Math.random() * options.length - 1)
    return `${options[i]}!`
}