import { PrismaClient } from "../../generated/prisma/client.js";
import { validateProperty, validateUser } from "../../utils/bookingHelpers.js";
import { validateInteger, validateNumber, validateRange, validateString } from "../../utils/validate.js";
import { validateReviewId } from "../../utils/reviewHelpers.js";
const prisma = new PrismaClient();

const updateReview = async ({ id, userId, propertyId, rating, comment }) => {
    await validateReviewId({ id });
    const data = {};

    if (userId) {
        await validateUser(userId)
        data.userId = userId;
    }
    
    if (propertyId) {
        await validateProperty(propertyId);
        data.propertyId = propertyId;
    } 

    if (rating !== undefined) {
        validateNumber({rating}, ["rating"]);
        validateInteger({rating}, ["rating"]);
        validateRange({ rating }, "rating", 0, 5);

        data.rating = rating;
    }

    if (comment) {
        validateString({comment}, ["comment"]);
        data.comment = comment;
    }

    const updatedReview = await prisma.review.update({
        where: { id },
        data,
    });

    return updatedReview;
}

export default updateReview;