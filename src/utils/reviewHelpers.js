import { PrismaClient } from "../generated/prisma/client.js";
import BadRequestError from "../errors/BadRequestError.js";
import NotFoundError from "../errors/NotFoundError.js";

const prisma = new PrismaClient();

export const validateReview = async ({ userId, propertyId }) => {
  const existingReview = await prisma.review.findFirst({
    where: { userId, propertyId },
  });

  if (existingReview) {
    throw new BadRequestError("User has already reviewed this property");
  }
};

export const validateReviewId = async ({ id }) => {
  const existingReview = await prisma.review.findFirst({
    where: { id },
  });

  if (!existingReview) {
    throw new NotFoundError("review", id);
  }

  return existingReview
};