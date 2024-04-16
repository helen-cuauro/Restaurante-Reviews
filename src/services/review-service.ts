import * as reviewDB from "../data/reviews-data";
import { ApiError } from "../middlewares/error";
import { Review, ReviewParams } from "../models/review";

export async function getRestaurantReviews(restaurantId: number) {
  return await reviewDB.getRestaurantReviews(restaurantId);
}

export async function getReviewbyId(noteId: string): Promise<Review> {
  return await reviewDB.getReviewbyId(noteId);
}

export async function postRestaurantReview(
  data: ReviewParams,
  restaurantId: number,
  userId: number
) {
  return await reviewDB.postRestaurantReview(data, restaurantId, userId);
}

export async function patchReview(
  data: ReviewParams,
  reviewId: string,
  userRole: string,
  userId: number
) {
  return await reviewDB.patchReview(data, reviewId);
}

export async function validateOwnerReview(
  userRole: string,
  reviewId: string,
  userId: number
) {
  if (userRole === "user") {
    const review = await getReviewbyId(reviewId);
    if (review.userId != userId) {
      throw new ApiError(
        "El usuario solo puede editar reseñas que le pertenezcan",
        400
      );
    }
  }
}

export async function deleteReview(idReview: string) {
  return await reviewDB.deleteReview(idReview);
}
