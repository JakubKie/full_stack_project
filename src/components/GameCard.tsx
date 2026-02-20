import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type {Game} from "@/types/game";
import { toast } from "sonner";

type Props = {
    game: Game;
    onAdd: (id: string) => void;
};

export default function GameCard({ game, onAdd }: Props) {
    return (
        <Card className="group hover:shadow-xl transition">
            <CardContent className="p-4">
                <img
                    src={game.image}
                    alt={game.title}
                    className="rounded-lg mb-4 group-hover:scale-105 transition"
                />
                <h3 className="text-lg font-bold">{game.title}</h3>
                <p className="text-muted-foreground">{game.price} zł</p>
            </CardContent>

            <CardFooter className="flex justify-between">
                <Badge>{game.platform}</Badge>
                <Button onClick={() => {onAdd(game.id); console.log(1);
                    toast("Added item to cart", {
                        description: `Added ${game.title} to cart`,
                        action: {
                            label: "Undo",
                            onClick: () => console.log("Undo"),
                        }
                    });}}>
                    Dodaj
                </Button>
            </CardFooter>
        </Card>
    );
}