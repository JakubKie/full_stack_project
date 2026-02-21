import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Props = {
    setPage: (page: "home" | "cart" | "checkout") => void;
};

export default function Cart({ setPage }: Props) {
    const {
        items,
        removeFromCart,
        increase,
        decrease,
        clearCart,
    } = useCart();

    const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h2 className="text-3xl font-bold mb-4">
                    Koszyk jest pusty
                </h2>
                <p className="text-muted-foreground mb-6">
                    Dodaj gry, aby zobaczyć je tutaj.
                </p>
                <Button onClick={() => setPage("home")}>
                    Wróć do sklepu
                </Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-10">

            <h2 className="text-3xl font-bold mb-8">
                Twój koszyk
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* LEFT — ITEMS */}
                <div className="lg:col-span-2 space-y-6">
                    {items.map(item => (
                        <Card key={item.id} className="p-4">
                            <CardContent className="p-0 flex flex-col sm:flex-row gap-4 items-center justify-between">

                                {/* LEFT SIDE */}
                                <div className="flex items-center gap-4 w-full">

                                    <div className="h-20 w-20 flex items-center justify-center rounded-lg overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="max-h-full max-w-full object-contain"
                                        />
                                    </div>

                                    <div>
                                        <h3 className="font-bold">
                                            {item.title}
                                        </h3>
                                        <Badge className="mt-1">
                                            {item.platform}
                                        </Badge>
                                    </div>
                                </div>

                                {/* RIGHT SIDE */}
                                <div className="flex items-center gap-4">

                                    {/* Quantity Controls */}
                                    <div className="flex items-center border rounded-md">

                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => decrease(item.id)}
                                        >
                                            −
                                        </Button>

                                        <span className="px-3">
                                            {item.quantity}
                                        </span>

                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => increase(item.id)}
                                        >
                                            +
                                        </Button>
                                    </div>

                                    {/* Price */}
                                    <div className="w-20 text-right font-semibold">
                                        {item.price * item.quantity} zł
                                    </div>

                                    {/* Remove */}
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        Usuń
                                    </Button>

                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* RIGHT — SUMMARY */}
                <div className="lg:col-span-1">
                    <Card className="p-6 sticky top-24">
                        <h3 className="text-xl font-bold mb-4">
                            Podsumowanie
                        </h3>

                        <div className="flex justify-between mb-2">
                            <span>Liczba produktów:</span>
                            <span>
                                {items.reduce((s, i) => s + i.quantity, 0)}
                            </span>
                        </div>

                        <div className="flex justify-between text-lg font-bold mb-6">
                            <span>Łącznie:</span>
                            <span>{total} zł</span>
                        </div>

                        <Button
                            className="w-full mb-3"
                            onClick={() => setPage("checkout")}
                        >
                            Przejdź do płatności
                        </Button>

                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={clearCart}
                        >
                            Wyczyść koszyk
                        </Button>
                    </Card>
                </div>

            </div>
        </div>
    );
}