import express from "express";
import getReviews from "../services/reviews/getReviews.js";
import NotFoundErrorHandler from "../middleware/NotFoundErrorHandler.js";
import createReview from "../services/reviews/createReview.js";
import authMiddleware from "../middleware/auth.js";
import updateReview from "../services/reviews/updateReview.js";
import deleteReview from "../services/reviews/deleteReview.js";
import getReviewById from "../services/reviews/getReviewById.js";
import { validateId } from "../utils/validate.js";

const router = express.Router();

router.get(
  "/",
  async (req, res, next) => {
    try {
      const reviews = await getReviews();
      res.status(200).json(reviews);
    } catch (error) {
      next(error);
    }
  },
  NotFoundErrorHandler
);

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    validateId({id, message: "Review ID is required" })
    const review = await getReviewById({ id });
    return res.status(200).json(review);
  } catch (error) {
    next(error);
  }
});

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const review = await createReview(req.body);
    return res.status(201).json(review);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    validateId({ id, message: "Review ID is required" });
    const updatedReview = await updateReview({ id, ...req.body });
    return res.status(200).json(updatedReview);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    validateId({ id, message: "Review ID is required" });
    const deletedReview = await deleteReview({ id });
    return res
      .status(200)
      .json({ message: `Review with id ${deletedReview} was deleted` });
  } catch (error) {
    next(error);
  }
});

router.use(NotFoundErrorHandler);

export default router;
