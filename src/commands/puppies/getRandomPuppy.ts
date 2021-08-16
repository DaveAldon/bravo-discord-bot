import { puppyIds } from "./puppyIds";

export const getRandomPuppy = () => {
    const url = "https://openpuppies.com/mp4/";
    const i = Math.floor(Math.random() * puppyIds.length - 1);
    const randomPuppy = puppyIds[i];
    return `${url}${randomPuppy}.mp4`;
}