import { PrismaClient } from "../../generated/prisma/client.js";
import { validateReviewId } from "../../utils/reviewHelpers.js";

const prisma = new PrismaClient();

const deleteReview = async ({ id }) => {
    
    await validateReviewId({ id });

    const deletedReview = await prisma.review.delete({
        where: { id }
    });

    return deletedReview.id
}

export default deleteReview