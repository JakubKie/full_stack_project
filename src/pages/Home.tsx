import GameCard from "@/components/GameCard";
import type {Game} from "@/types/game";
import { useCart } from "@/context/CartContext";

const mockGames: Game[] = [
    {
        id: "1",
        title: "Cyberpunk 2077",
        price: 199,
        platform: "PC",
        image: "https://via.placeholder.com/300",
        description: "Futurystyczne RPG",
    },
    {
        id: "2",
        title: "Wiedźmin 3",
        price: 149,
        platform: "PS5",
        image: "https://via.placeholder.com/300",
        description: "Fantasy RPG",
    },
];

export default function Home() {
    const { addToCart } = useCart();
    return (
        <div className="container mx-auto px-4 py-8">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {mockGames.map(game => (
                    <GameCard
                        key={game.id}
                        game={game}
                        onAdd={() => addToCart(game)}
                    />
                ))}
            </div>

        </div>
    );
}