import { z } from "zod";

export const reviewSchema = z.object({
  userId: z
    .number({
      required_error: "UserId es requerido",
      invalid_type_error: "UserId debe ser un número",
    })
    .optional(),
  restaurantId: z
    .number({
      required_error: "RestaurantId es requerido",
      invalid_type_error: "RestaurantId debe ser un número",
    })
    .optional(),
  score: z
    .number({
      required_error: "Score es requerido",
      invalid_type_error: "Score debe ser un número",
    })
    .refine((score) => score >= 1 && score <= 5, {
      message: "Score debe estar en el rango de 1 a 5",
    }),
  title: z.string({
    required_error: "Title es requerido",
    invalid_type_error: "Title debe ser un string",
  }),
  description: z.string({
    required_error: "Description es requerido",
    invalid_type_error: "Description debe ser un string",
  }),
});

export type ReviewParams = z.infer<typeof reviewSchema>;
export type Review = ReviewParams & { id: number };

export const editReviewSchema = reviewSchema.partial();
