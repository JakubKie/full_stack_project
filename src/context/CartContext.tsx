import { createContext, useContext, useState, type ReactNode } from "react";
import type {Game} from "@/types/game";
import { toast } from "sonner";

type CartItem = Game & {
    quantity: number;
};

type CartContextType = {
    items: CartItem[];
    addToCart: (game: Game) => void;
    removeFromCart: (id: string) => void;
    increase: (id: string) => void;
    decrease: (id: string) => void;
    totalPrice: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    const addToCart = (game: Game) => {
        let wasExisting = false;

        setItems(prev => {
            const existing = prev.find(item => item.id === game.id);

            if (existing) {
                wasExisting = true;
                return prev.map(item =>
                    item.id === game.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...prev, { ...game, quantity: 1 }];
        });

        if (wasExisting) {
            toast.info("Zwiększono ilość w koszyku");
        } else {
            toast.success(`${game.title} dodano do koszyka`);
        }
    };

    const removeFromCart = (id: string) => {
        setItems(prev => prev.filter(item => item.id !== id));
        toast.error("Usunięto z koszyka");
    };

    const increase = (id: string) => {
        setItems(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    const decrease = (id: string) => {
        setItems(prev =>
            prev
                .map(item =>
                    item.id === id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter(item => item.quantity > 0)
        );
    };

    const totalPrice = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                increase,
                decrease,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within CartProvider");
    }
    return context;
}