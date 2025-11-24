import { PrismaClient } from "../../generated/prisma/client.js";
import { validateBooking } from "../../utils/bookingHelpers.js";

const prisma = new PrismaClient();

const deleteBooking = async ({ id }) => {

    await validateBooking({ id });

    const deletedBooking = await prisma.booking.delete({
        where: { id }
    });

    return deletedBooking.id;
}

export default deleteBooking