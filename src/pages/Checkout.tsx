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

export default function Checkout() {
    const [step, setStep] = useState(1);
    const { totalPrice, clearCart } = useCart();

    const form = useForm<CheckoutData>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            email: "",
            nickname: "",
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

        if (step === 1) fields = ["email", "nickname", "password"];
        if (step === 2) fields = ["city", "postalCode", "street"];

        const isValid = await form.trigger(fields);
        if (isValid) setStep(prev => prev + 1);
    };

    const onSubmit = (data: CheckoutData) => {
        console.log("ORDER:", data);
        toast.success("Zamówienie złożone pomyślnie!");
        clearCart();
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-md">
            <h1 className="text-2xl font-bold mb-6">
                Checkout – Suma: {totalPrice} zł
            </h1>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                    {/* STEP 1 */}
                    {step === 1 && (
                        <>
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

                            <FormField
                                control={form.control}
                                name="nickname"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nick</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

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
                        </>
                    )}

                    {/* STEP 2 */}
                    {step === 2 && (
                        <>
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
                        </>
                    )}

                    {/* STEP 3 */}
                    {step === 3 && (
                        <>
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
                                                    <SelectValue placeholder="Wybierz typ płatności" />
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
                                    <FormItem className="flex items-center space-x-2">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={(checked) =>
                                                    field.onChange(!!checked)
                                                }
                                            />
                                        </FormControl>
                                        <FormLabel className="!mt-0">
                                            Akceptuję regulamin
                                        </FormLabel>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}

                    {/* NAVIGATION */}
                    <div className="flex justify-between pt-4">
                        {step > 1 && (
                            <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                                Back
                            </Button>
                        )}

                        {step < 3 && (
                            <Button type="button" onClick={nextStep}>
                                Next
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
    );
}