import { query } from "../db";
import { Restaurant, RestaurantParams } from "../models/restaurant";
import { getEditQueryAndData } from "../utils/util";

export async function getRestaurants(): Promise<Restaurant[] | undefined> {
  return (await query("SELECT * FROM restaurants ")).rows;
}

export async function getRestaurant(
  id: number
): Promise<Restaurant | undefined> {
  return (await query("SELECT * FROM restaurant WHERE id = $1", [id])).rows[0];
}

export async function editRestaurant(
  id: string,
  data: RestaurantParams
): Promise<Restaurant> {
  const [patchQuery, queryData] = getEditQueryAndData(id, data, "restaurants");
  const result = await query(patchQuery, queryData);

  if (result.rowCount === 0) {
    throw new Error("No se encontró el restaurante para editar");
  }

  return result.rows[0];
}

export async function deleteRestaurant(
  id: string
): Promise<Restaurant | undefined> {
  return (await query("DELETE FROM restaurants WHERE id = $1", [id])).rows[0];
}

export async function createRestaurant(
  name: string,
  address: string,
  category: string
): Promise<Restaurant> {
  return (
    await query(
      "INSERT INTO restaurants (name, address, category) VALUES ($1, $2, $3) RETURNING *",
      [name, address, category]
    )
  ).rows[0];
}
