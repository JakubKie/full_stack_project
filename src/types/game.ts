export type Platform = "PC" | "PS5" | "Xbox";

export type Game = {
    id: string;
    title: string;
    price: number;
    platform: Platform;
    image: string;
    description: string;
};

export type DiscountedGame = Game & {
    discount: number;
};

export type Cart = Record<string, number>;