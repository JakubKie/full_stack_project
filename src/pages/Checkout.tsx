import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema, type CheckoutData } from "@/lib/validators";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function Checkout() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CheckoutData>({
        resolver: zodResolver(checkoutSchema),
    });

    const onSubmit = (data: CheckoutData) => {
        console.log(data);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-md">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                <div>
                    <Label>Email</Label>
                    <Input {...register("email")} />
                    {errors.email && (
                        <p className="text-red-500 text-sm">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <div>
                    <Label>Nick</Label>
                    <Input {...register("nickname")} />
                </div>

                <div>
                    <Label>Hasło</Label>
                    <Input type="password" {...register("password")} />
                </div>

                <div>
                    <Label>Kod pocztowy</Label>
                    <Input {...register("postalCode")} />
                </div>

                <div>
                    <Label>Miasto</Label>
                    <Input {...register("city")} />
                </div>

                <div>
                    <Label>Ulica</Label>
                    <Input {...register("street")} />
                </div>

                <Button type="submit" className="w-full">
                    Złóż zamówienie
                </Button>

            </form>
        </div>
    );
}