import {z} from "zod";

export const loginFormSchema = z.object({
    email: z.string()
        .email({
            message: "Please enter a valid email address",
        })
        .nonempty({
            message: "Email is required",
        }),
    password: z.string()
        .nonempty({
            message: "Password is required",
        }),
});
