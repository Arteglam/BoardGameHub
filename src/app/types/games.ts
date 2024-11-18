import { User } from "./user";

export interface Game {
    _id: string;
    title: string;
    year: number;
    designer: string;
    artist: string;
    publisher: string;
    rating: number;
    category: string[];
    description: string;
    image: string;
    addedBy: User;
    creatorId: User;
}
