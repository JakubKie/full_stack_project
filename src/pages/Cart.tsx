import { useCart } from "@/context/CartContext";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function Cart() {
    const { items, increase, decrease, removeFromCart, totalPrice } = useCart();

    return (
        <div className="container mx-auto px-4 py-8">

            <h1 className="text-2xl font-bold mb-6">Koszyk</h1>

            {items.length === 0 ? (
                <p>Koszyk jest pusty</p>
            ) : (
                <>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Gra</TableHead>
                                <TableHead>Ilość</TableHead>
                                <TableHead>Cena</TableHead>
                                <TableHead>Akcje</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {items.map(item => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.title}</TableCell>

                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => decrease(item.id)}
                                            >
                                                -
                                            </Button>

                                            {item.quantity}

                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => increase(item.id)}
                                            >
                                                +
                                            </Button>
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        {item.price * item.quantity} zł
                                    </TableCell>

                                    <TableCell>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            Usuń
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <div className="mt-6 flex justify-between items-center">
                        <h2 className="text-xl font-semibold">
                            Suma: {totalPrice} zł
                        </h2>

                        <Button>
                            Przejdź do checkout
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}