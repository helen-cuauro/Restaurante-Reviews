import { z } from "zod";

export const restaurantSchema = z.object({
  name: z.string({
    required_error: "Name es requerido",
    invalid_type_error: "Name debe ser un string",
  }),
  address: z.string({
    required_error: "Address es requerido",
    invalid_type_error: "Address debe ser un string",
  }),
  category: z.string({
    required_error: "Category es requerido",
    invalid_type_error: "Category debe ser un string",
  }),
});

export type RestaurantParams = z.infer<typeof restaurantSchema>;

export type Restaurant = RestaurantParams & { id: number };

export const editRestaurantSchema = restaurantSchema.partial();
