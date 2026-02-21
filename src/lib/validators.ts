import { z } from "zod";

export const checkoutSchema = z.object({
    email: z.email("Niepoprawny email"),
    login: z.string().min(3, "Min 3 znaki"),
    password: z.string()
        .min(8, "Min 8 znaków")
        .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Musi zawierać wielką i małą literę, cyfrę, oraz znak specjalny"),

    city: z.string().min(1, "Podaj miasto"),
    postalCode: z.string().regex(/^\d{2}-\d{3}$/, "Format: 00-000"),
    street: z.string().min(1, "Podaj ulicę"),

    paymentType: z.string("Wybierz typ płatności")
        .refine(val => ["card", "blik", "paypal"].includes(val), {
            message: "Wybierz typ płatności",
        }),
    terms: z.boolean().refine(val => val === true, {
        message: "Musisz zaakceptować regulamin",
    }),
});

export type CheckoutData = z.infer<typeof checkoutSchema>;