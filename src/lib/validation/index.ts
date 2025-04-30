import { z } from "zod";
// form schema goes out if the form
export const SignupValidationSchema = z.object({
    name: z.string().min(2, { message: 'Too short' }),
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().email(),
    password: z.string().min(8, { message: 'Too short' })
});
