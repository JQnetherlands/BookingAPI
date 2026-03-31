import prisma from "../../lib/prisma.js";
import { validateBooking } from "../../utils/bookingHelpers.js";

const deleteBooking = async ({ id }) => {

    await validateBooking({ id });

    const deletedBooking = await prisma.booking.delete({
        where: { id }
    });

    return deletedBooking.id;
}

export default deleteBooking