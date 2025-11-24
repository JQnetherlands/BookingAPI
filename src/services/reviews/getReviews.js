import { PrismaClient } from "../../generated/prisma/client.js";

const prisma = new PrismaClient();

const getReviews = async () => {
    const reviews = await prisma.review.findMany();

    return reviews
}

export default getReviews;