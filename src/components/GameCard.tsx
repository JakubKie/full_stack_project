import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Game } from "@/types/game";

type Props = {
    game: Game;
    onAdd: (id: string) => void;
};

export default function GameCard({ game, onAdd }: Props) {
    return (
        <Card className="group hover:shadow-xl transition hover:scale-[1.02] flex flex-col justify-between">

            <CardContent className="pr-4 pl-4 flex flex-col items-center">

                <div className="h-35 w-full flex items-center justify-center rounded-lg mb-4">
                    <img
                        src={game.image}
                        alt={game.title}
                        className="max-h-full max-w-full object-contain transition group-hover:scale-105"
                    />
                </div>

                <h3 className="text-lg font-bold text-center">
                    {game.title}
                </h3>

                <p className="text-muted-foreground">
                    {game.price} zł
                </p>

            </CardContent>

            <CardFooter className="flex justify-between px-4">
                <Badge>{game.platform}</Badge>
                <Button onClick={() => onAdd(game.id)}>
                    Dodaj
                </Button>
            </CardFooter>

        </Card>
    );
}