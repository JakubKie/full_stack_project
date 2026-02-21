import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import { CartProvider } from "@/context/CartContext";

export default function App() {
    const [page, setPage] = useState<"home" | "cart" | "checkout">("home");

    return (
        <CartProvider>
            <div>
                <div className="p-4 border-b flex gap-4">
                    <button onClick={() => setPage("home")}>Home</button>
                    <button onClick={() => setPage("cart")}>Cart</button>
                    <button onClick={() => setPage("checkout")}>Checkout</button>
                </div>

                {page === "home" && <Home />}
                {page === "cart" && <Cart setPage={setPage}/>}
                {page === "checkout" && <Checkout />}

                <Toaster richColors theme={"dark"}/>
            </div>
        </CartProvider>
    );
}