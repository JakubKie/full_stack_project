import { z } from "zod";

export const checkoutSchema = z.object({
    email: z.string().email("Niepoprawny email"),
    nickname: z.string().min(3, "Min 3 znaki"),
    password: z
        .string()
        .min(8, "Min 8 znaków")
        .regex(/[A-Z]/, "Musi zawierać wielką literę"),
    city: z.string().min(2),
    postalCode: z.string().regex(/^\d{2}-\d{3}$/, "Format: 00-000"),
    street: z.string().min(3),
    paymentType: z.enum(["card", "blik", "paypal"]),
    terms: z.boolean().refine(val => val === true, {
        message: "Musisz zaakceptować regulamin",
    }),
}).refine(data => data.password !== data.nickname, {
    message: "Hasło nie może być takie jak nick",
    path: ["password"],
});

export type CheckoutData = z.infer<typeof checkoutSchema>;