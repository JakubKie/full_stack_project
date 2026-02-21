import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema, type CheckoutData } from "@/lib/validators";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

type Props = {
    setPage: (page: "home" | "cart" | "checkout") => void;
};

export default function Checkout({ setPage }: Props) {
    const [step, setStep] = useState(1);
    const { totalPrice, clearCart, items } = useCart();

    const form = useForm<CheckoutData>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            email: "",
            login: "",
            password: "",
            city: "",
            postalCode: "",
            street: "",
            paymentType: "",
            terms: false,
        },
        mode: "onTouched",
    });

    const nextStep = async () => {
        let fields: (keyof CheckoutData)[] = [];

        if (step === 1) fields = ["email", "login", "password"];
        if (step === 2) fields = ["city", "postalCode", "street"];

        const isValid = await form.trigger(fields);
        if (isValid) setStep(prev => prev + 1);
    };

    const onSubmit = (data: CheckoutData) => {
        console.log("ORDER:", data);
        toast.success("Zamówienie złożone pomyślnie!");
        clearCart();
        setPage("home")
    };

    return (
        <div className="container mx-auto px-4 py-12">

            <h1 className="text-3xl font-bold mb-10">
                Checkout
            </h1>

            {/* GRID LAYOUT */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* LEFT – FORM */}
                <div className="lg:col-span-2">

                    {/* STEP INDICATOR */}
                    <div className="flex items-center gap-4 mb-8">
                        {[1, 2, 3].map(s => (
                            <div
                                key={s}
                                className={`flex-1 h-2 rounded-full transition ${
                                    step >= s
                                        ? "bg-primary"
                                        : "bg-muted"
                                }`}
                            />
                        ))}
                    </div>

                    <div className="bg-card border rounded-xl p-6 shadow-sm">

                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-6"
                            >

                                {/* STEP 1 */}
                                {step === 1 && (
                                    <div className="space-y-4">
                                        <h2 className="text-xl font-semibold">
                                            Dane konta
                                        </h2>

                                        {/* EMAIL */}
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* LOGIN */}
                                        <FormField
                                            control={form.control}
                                            name="login"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Login</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* PASSWORD */}
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Hasło</FormLabel>
                                                    <FormControl>
                                                        <Input type="password" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                )}

                                {/* STEP 2 */}
                                {step === 2 && (
                                    <div className="space-y-4">
                                        <h2 className="text-xl font-semibold">
                                            Adres dostawy
                                        </h2>

                                        <FormField
                                            control={form.control}
                                            name="city"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Miasto</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="postalCode"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Kod pocztowy</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="street"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Ulica</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                )}

                                {/* STEP 3 */}
                                {step === 3 && (
                                    <div className="space-y-4">
                                        <h2 className="text-xl font-semibold">
                                            Płatność
                                        </h2>

                                        <FormField
                                            control={form.control}
                                            name="paymentType"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Typ płatności</FormLabel>
                                                    <Select
                                                        value={field.value}
                                                        onValueChange={field.onChange}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Wybierz płatność" />
                                                            </SelectTrigger>
                                                        </FormControl>

                                                        <SelectContent>
                                                            <SelectItem value="card">Karta</SelectItem>
                                                            <SelectItem value="blik">BLIK</SelectItem>
                                                            <SelectItem value="paypal">PayPal</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="terms"
                                            render={({ field }) => (
                                                <FormItem className="flex items-center space-x-3">
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value}
                                                            onCheckedChange={checked =>
                                                                field.onChange(!!checked)
                                                            }
                                                            className="h-2"
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="!mt-0">
                                                        Akceptuję regulamin
                                                    </FormLabel>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                )}

                                {/* NAVIGATION */}
                                <div className="flex justify-between pt-6 border-t">
                                    {step > 1 && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setStep(step - 1)}
                                        >
                                            Wstecz
                                        </Button>
                                    )}

                                    {step < 3 && (
                                        <Button type="button" onClick={nextStep}>
                                            Dalej
                                        </Button>
                                    )}

                                    {step === 3 && (
                                        <Button type="submit">
                                            Złóż zamówienie
                                        </Button>
                                    )}
                                </div>

                            </form>
                        </Form>
                    </div>
                </div>

                {/* RIGHT – SUMMARY */}
                <div>
                    <div className="bg-card border rounded-xl p-6 shadow-sm sticky top-24">
                        <h3 className="text-xl font-semibold mb-4">
                            Podsumowanie
                        </h3>

                        <div className="space-y-2 mb-4">
                            {items.map(item => (
                                <div
                                    key={item.id}
                                    className="flex justify-between text-sm"
                                >
                                    <span>
                                        {item.title} × {item.quantity}
                                    </span>
                                    <span>
                                        {item.price * item.quantity} zł
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="border-t pt-4 flex justify-between font-bold text-lg">
                            <span>Łącznie:</span>
                            <span>{totalPrice} zł</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}