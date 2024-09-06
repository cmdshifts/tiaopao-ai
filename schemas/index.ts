import * as z from "zod";

export const LoginScehma = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(1 , {
        message: "Password is required"
    }),
});

export const RegisterScehma = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(1 , {
        message: "Minimum 6 character required"
    }),
    name: z.string().min(1, {
        message: "Name is required",
    })
});