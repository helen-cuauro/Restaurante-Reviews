import express from "express";
import {
  deleteReview,
  getRestaurantReviews,
  patchReview,
  postRestaurantReview,
  validateOwnerReview,
} from "../services/review-service";
import { authenticateHandler } from "../middlewares/authenticate";
import { validationHandler } from "../middlewares/validation";
import { editReviewSchema, reviewSchema } from "../models/review";

const reviewRouter = express.Router();

reviewRouter.get("/", async (req, res, next) => {
  try {
    const restaurantId = res.locals["id"];
    const reviews = await getRestaurantReviews(restaurantId);
    res.json({
      ok: true,
      message: "Lista de reseñas para el restaurante",
      data: { reviews },
    });
  } catch (error) {
    next(error);
  }
});

reviewRouter.post(
  "/",
  authenticateHandler,
  validationHandler(reviewSchema),
  async (req, res, next) => {
    try {
      const restaurantId = res.locals["id"];
      const userId = req.userId!;
      const review = await postRestaurantReview(req.body, restaurantId, userId);
      res.json({
        ok: true,
        message: "Reseña añadida exitosamente",
        data: { review },
      });
    } catch (error) {
      next(error);
    }
  }
);

reviewRouter.patch(
  "/:reviewId",
  authenticateHandler,
  validationHandler(editReviewSchema),
  async (req, res, next) => {
    try {
      const reviewId = req.params["reviewId"];
      const userRole = req.userRole!;
      const userId = req.userId!;
      await validateOwnerReview(userRole, reviewId, userId);
      const review = await patchReview(req.body, reviewId, userRole, userId);
      res.json({
        ok: true,
        message: "Reseña actualizada exitosamente",
        data: { review },
      });
    } catch (error) {
      next(error);
    }
  }
);

reviewRouter.delete(
  "/:reviewId",
  authenticateHandler,
  async (req, res, next) => {
    try {
      const reviewId = req.params["reviewId"];
      const userRole = req.userRole!;
      const userId = req.userId!;
      await validateOwnerReview(userRole, reviewId, userId);
      await deleteReview(reviewId);
      res.json({
        ok: true,
        message: "Reseña eliminada exitosamente",
      });
    } catch (error) {
      next(error);
    }
  }
);

export default reviewRouter;
