export const randomGreeting = () => {
    const options = ["hello", "howdy", "hey", "hi", "salutations", "greetings", "sup", "yo"]
    const i = Math.floor(Math.random() * options.length)
    return `${options[i]}!`
}