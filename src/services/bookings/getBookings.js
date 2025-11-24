import { PrismaClient } from "../../generated/prisma/client.js";
import { validateUser } from "../../utils/bookingHelpers.js";

const prisma = new PrismaClient();

const getBookings = async ({userId}) => {
    const where = {};

    if (userId) {
        await validateUser(userId);
        where.userId = userId;
    }
    
    const bookings = await prisma.booking.findMany({
        where,
    })


    return bookings;
}

export default getBookings;