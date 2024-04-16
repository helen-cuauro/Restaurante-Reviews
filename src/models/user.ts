import { z } from "zod";

export const userSchema = z.object({
  username: z
    .string({
      required_error: "Username es requerido",
      invalid_type_error: "Username debe ser un string",
    }),
  password: z
    .string({
      required_error: "Password es requerido",
      invalid_type_error: "Password debe ser un string",
    })
    .min(6, "Password debe tener al menos 6 caracteres"),
    role: z
    .enum(["admin", "user"], {
      errorMap: (issue,ctx) => {
        return {message: "Role solo puede ser 'user' o 'admin'"}
      }
    })
    .default("user"),
});


export type UserParams = z.infer<typeof userSchema>;
export type User = UserParams & { id: number };


