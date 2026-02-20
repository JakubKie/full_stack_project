import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema, type CheckoutData } from "@/lib/validators";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function Checkout() {
    const [step, setStep] = useState(1);
    const { totalPrice, clearCart } = useCart();

    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors },
    } = useForm<CheckoutData>({
        resolver: zodResolver(checkoutSchema),
        mode: "onTouched",
    });

    const nextStep = async () => {
        let fields: (keyof CheckoutData)[] = [];

        if (step === 1) {
            fields = ["email", "nickname", "password"];
        }

        if (step === 2) {
            fields = ["city", "postalCode", "street"];
        }

        const isValid = await trigger(fields);

        if (isValid) setStep(prev => prev + 1);
    };

    const prevStep = () => setStep(prev => prev - 1);

    const onSubmit = (data: CheckoutData) => {
        console.log("ORDER:", data);

        toast.success("Zamówienie złożone pomyślnie!");
        clearCart();
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-md">
            <h1 className="text-2xl font-bold mb-4">
                Checkout – Suma: {totalPrice} zł
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                {/* STEP 1 */}
                {step === 1 && (
                    <>
                        <div>
                            <Label>Email</Label>
                            <Input {...register("email")} />
                            <p className="text-red-500 text-sm">{errors.email?.message}</p>
                        </div>

                        <div>
                            <Label>Nick</Label>
                            <Input {...register("nickname")} />
                            <p className="text-red-500 text-sm">{errors.nickname?.message}</p>
                        </div>

                        <div>
                            <Label>Hasło</Label>
                            <Input type="password" {...register("password")} />
                            <p className="text-red-500 text-sm">{errors.password?.message}</p>
                        </div>
                    </>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                    <>
                        <div>
                            <Label>Miasto</Label>
                            <Input {...register("city")} />
                            <p className="text-red-500 text-sm">{errors.city?.message}</p>
                        </div>

                        <div>
                            <Label>Kod pocztowy</Label>
                            <Input {...register("postalCode")} />
                            <p className="text-red-500 text-sm">{errors.postalCode?.message}</p>
                        </div>

                        <div>
                            <Label>Ulica</Label>
                            <Input {...register("street")} />
                            <p className="text-red-500 text-sm">{errors.street?.message}</p>
                        </div>
                    </>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                    <>
                        <div>
                            <Label>Typ płatności</Label>
                            <select
                                {...register("paymentType")}
                                className="w-full border rounded-md p-2"
                            >
                                <option value="">Wybierz</option>
                                <option value="card">Karta</option>
                                <option value="blik">BLIK</option>
                                <option value="paypal">PayPal</option>
                            </select>
                            <p className="text-red-500 text-sm">
                                {errors.paymentType?.message}
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <input type="checkbox" {...register("terms")} />
                            <Label>Akceptuję regulamin</Label>
                        </div>
                        <p className="text-red-500 text-sm">{errors.terms?.message}</p>
                    </>
                )}

                {/* NAVIGATION */}
                <div className="flex justify-between pt-4">
                    {step > 1 && (
                        <Button type="button" variant="outline" onClick={prevStep}>
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
        </div>
    );
}