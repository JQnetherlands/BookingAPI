import prisma from "../../lib/prisma.js";


const getReviews = async () => {
    const reviews = await prisma.review.findMany();

    return reviews
}

export default getReviews;