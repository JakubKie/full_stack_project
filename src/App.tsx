import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider} from "@/context/CartContext";
import { Button } from "@/components/ui/button";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

type Page = "home" | "cart" | "checkout";

function Navbar({page, setPage,}: {
    page: Page;
    setPage: (p: Page) => void;
}) {
    return (
        <header className="border-b bg-background sticky top-0 z-50 w-full">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">

                <h1
                    className="text-xl font-bold cursor-pointer"
                    onClick={() => setPage("home")}
                >
                    GameStore
                </h1>

                <nav className="flex items-center gap-2">
                    <Button
                        variant={page === "home" ? "default" : "ghost"}
                        onClick={() => setPage("home")}
                    >
                        Home
                    </Button>

                    <Button
                        variant={page === "cart" ? "default" : "ghost"}
                        onClick={() => setPage("cart")}
                    >
                        Cart
                    </Button>

                    <Button
                        variant={page === "checkout" ? "default" : "ghost"}
                        onClick={() => setPage("checkout")}
                    >
                        Checkout
                    </Button>
                </nav>
            </div>
        </header>
    );
}
export default function App() {
    const [page, setPage] = useState<Page>("home");

    return (
        <CartProvider>
            <div className="min-h-screen flex flex-col bg-background text-foreground">

                <Navbar page={page} setPage={setPage} />

                <main className="flex-1">
                    {page === "home" && <Home />}
                    {page === "cart" && <Cart setPage={setPage} />}
                    {page === "checkout" && <Checkout setPage={setPage}/>}
                </main>

                <Toaster richColors theme="dark" />
            </div>
        </CartProvider>
    );
}