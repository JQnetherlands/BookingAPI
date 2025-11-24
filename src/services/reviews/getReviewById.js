import { validateReviewId } from "../../utils/reviewHelpers.js"

const getReviewById = async ({ id }) => {
   
    const existingReview = await validateReviewId({ id });
    

    return existingReview
}

export default getReviewById;