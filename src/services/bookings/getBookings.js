import prisma from "../../lib/prisma.js";
import { validateUser } from "../../utils/bookingHelpers.js";

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