import BadRequestError from "../../errors/BadRequestError.js";
import { PrismaClient } from "../../generated/prisma/client.js";
import { validateProperty, validateUser } from "../../utils/bookingHelpers.js";
import { validateReview } from "../../utils/reviewHelpers.js";
import { toNumber } from "../../utils/toNumber.js";
import {
  validateInteger,
  validateNumber,
  validateRange,
  validateRequired,
  validateString,
} from "../../utils/validate.js";

const prisma = new PrismaClient();

const createReview = async ({ userId, propertyId, rating, comment }) => {
  const required = { userId, propertyId, rating, comment };

  try {
    validateRequired(required, ["userId", "propertyId", "rating", "comment"]);
    required.rating = toNumber(required.rating, "rating");
    required.comment = required.comment.trim();

    validateString(required, ["comment"]);
    validateNumber(required, ["rating"]);
    validateInteger(required, ["rating"]);
    validateRange(required, "rating", 0, 5);
  } catch (err) {
    throw new BadRequestError(err.message);
  }

  await validateUser(required.userId);

  await validateProperty(required.propertyId);
  
  await validateReview({ userId: required.userId, propertyId: required.propertyId });

  const review = await prisma.review.create({
    data: {
      userId: required.userId,
      propertyId: required.propertyId,
      rating: required.rating,
      comment: required.comment,
    },
  });

  return review;
};

export default createReview;
