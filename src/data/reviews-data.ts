import { query } from "../db";
import { ReviewParams } from "../models/review";
import { postFormat, getEditQueryAndData } from "../utils/util";

export async function getRestaurantReviews(restaurantId: number) {
  return (
    await query("SELECT * FROM reviews WHERE restaurantid = $1", [restaurantId])
  ).rows;
}

export async function getReviewbyId(reviewId: string) {
  return (await query("SELECT * FROM reviews WHERE id = $1", [reviewId]))
    .rows[0];
}

export async function postRestaurantReview(
  data: ReviewParams,
  restaurantId: number,
  userId: number
) {
  const stringData = postFormat(data);
  return (
    await query(
      `INSERT INTO reviews (userId, restaurantId, score, title, description) VALUES ( $1,$2, ${stringData} ) RETURNING *`,
      [userId, restaurantId]
    )
  ).rows[0];
}

export async function patchReview(data: ReviewParams, reviewId: string) {
  const [patchQuery, queryData] = getEditQueryAndData(
    reviewId,
    data,
    "reviews"
  );
  const result = await query(patchQuery, queryData);

  if (result.rowCount === 0) {
    throw new Error("No se encontró el restaurante para editar");
  }

  return result.rows[0];
}

export async function deleteReview(idReview: string) {
  return (await query("DELETE FROM reviews WHERE id = $1", [idReview])).rows;
}
