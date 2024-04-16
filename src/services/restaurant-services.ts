import * as restaurantDB from "../data/restaurant-data";
import { RestaurantParams } from "../models/restaurant";

export async function getRestaurants() {
  return await restaurantDB.getRestaurants();
}

export async function createRestaurant(restaurantData: RestaurantParams) {
  const { name, address, category } = restaurantData;
  return await restaurantDB.createRestaurant(name, address, category);
}

export async function editRestaurant(
  id: string,
  restaurantData: RestaurantParams
) {
  return await restaurantDB.editRestaurant(id, restaurantData);
}

export async function deleteRestaurant(id: string) {
  return await restaurantDB.deleteRestaurant(id);
}
