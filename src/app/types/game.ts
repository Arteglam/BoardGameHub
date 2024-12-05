export interface Game {
    _id: string;
    title: string;
    year: number;
    designer: string;
    artist: string;
    publisher: string;
    rating: number;
    category: string;
    description: string;
    image: string;
    userId: string;
    createdAt: { seconds: number; nanoseconds: number };
    userDisplayName: string;
}
