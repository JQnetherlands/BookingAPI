import prisma from "../../lib/prisma.js";
import { validateUser } from "../../utils/bookingHelpers.js";


const deleteUser = async ({ id }) => {
    await validateUser(id);

    const deletedUser = await prisma.user.delete({
        where: { id }
    })

    return deletedUser.id
}

export default deleteUser