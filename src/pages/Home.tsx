import { useState, useMemo } from "react";
import { games } from "@/data/games";
import { useCart } from "@/context/CartContext";
import GameCard from "@/components/GameCard";
import { Button } from "@/components/ui/button";

export default function Home() {
    const { addToCart } = useCart();

    const [platformFilter, setPlatformFilter] = useState<
        "ALL" | "PC" | "PS5" | "Xbox"
    >("ALL");

    const [sort, setSort] = useState<"none" | "asc" | "desc">("none");

    const filteredGames = useMemo(() => {
        let result = [...games];

        if (platformFilter !== "ALL") {
            result = result.filter(g => g.platform === platformFilter);
        }

        if (sort === "asc") {
            result.sort((a, b) => a.price - b.price);
        }

        if (sort === "desc") {
            result.sort((a, b) => b.price - a.price);
        }

        return result;
    }, [platformFilter, sort]);

    return (
        <div className="container mx-auto px-4 py-8">
            <section className="mb-12 text-center">
                <h2 className="text-4xl font-bold mb-4">
                    Najlepsze gry w jednym miejscu
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Wybierz swoją platformę i dodaj gry do koszyka.
                </p>
            </section>

            <section className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="flex gap-2 flex-wrap">
                    {["ALL", "PC", "PS5", "Xbox"].map(platform => (
                        <Button
                            key={platform}
                            variant={platformFilter === platform ? "default" : "outline"}
                            onClick={() =>
                                setPlatformFilter(
                                    platform as "ALL" | "PC" | "PS5" | "Xbox"
                                )
                            }
                        >
                            {platform}
                        </Button>
                    ))}
                </div>

                <div className="flex gap-2">
                    <Button
                        variant={sort === "asc" ? "default" : "outline"}
                        onClick={() => setSort("asc")}
                    >
                        Cena ↑
                    </Button>

                    <Button
                        variant={sort === "desc" ? "default" : "outline"}
                        onClick={() => setSort("desc")}
                    >
                        Cena ↓
                    </Button>
                </div>

            </section>

            <section className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredGames.map(game => (
                    <GameCard
                        key={game.id}
                        game={game}
                        onAdd={() => addToCart(game)}
                    />
                ))}
            </section>

        </div>
    );
}