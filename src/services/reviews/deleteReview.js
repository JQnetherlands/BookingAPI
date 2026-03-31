import prisma from "../../lib/prisma.js";
import { validateReviewId } from "../../utils/reviewHelpers.js";


const deleteReview = async ({ id }) => {
    
    await validateReviewId({ id });

    const deletedReview = await prisma.review.delete({
        where: { id }
    });

    return deletedReview.id
}

export default deleteReview