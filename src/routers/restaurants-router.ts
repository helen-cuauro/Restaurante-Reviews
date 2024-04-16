import express from "express";
import {
  createRestaurant,
  deleteRestaurant,
  editRestaurant,
  getRestaurants,
} from "../services/restaurant-services";
import { authenticateHandler } from "../middlewares/authenticate";
import { validationHandler } from "../middlewares/validation";
import { restaurantSchema, editRestaurantSchema } from "../models/restaurant";

const restaurantsRouter = express.Router();

restaurantsRouter.get("/", async (_req, res) => {
  try {
    const restaurants = await getRestaurants();
    res.json({
      ok: true,
      message: "Lista de restaurantes",
      data: restaurants,
    });
  } catch (error) {
    res.status(500).send("Error al obtener los restaurants");
  }
});

restaurantsRouter.post(
  "/",
  authenticateHandler,
  validationHandler(restaurantSchema),
  async (req, res) => {
    try {
      const newRestaurant = await createRestaurant(req.body);
      res.json({
        ok: true,
        message: "Restaurante creado exitosamente",
        data: { newRestaurant },
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Ocurrió un error en el servidor");
    }
  }
);

restaurantsRouter.patch(
  "/:id",
  authenticateHandler,
  validationHandler(editRestaurantSchema),
  async (req, res) => {
    const id = req.params["id"];
    try {
      const updateRestaurant = await editRestaurant(id, req.body);
      res.json({
        ok: true,
        message: "Restaurante actualizado exitosamente",
        data: { updateRestaurant },
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Ocurrió un error en el servidor");
    }
  }
);

restaurantsRouter.delete("/:id", authenticateHandler, async (req, res) => {
  const id = req.params["id"];
  try {
    const updateRestaurant = await deleteRestaurant(id);
    console.log(updateRestaurant);
    res.json({
      ok: true,
      message: "Restaurante eliminado exitosamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Ocurrió un error en el servidor");
  }
});

export default restaurantsRouter;
