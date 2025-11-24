import { PrismaClient } from "../../generated/prisma/client.js";
import { validateUser } from "../../utils/bookingHelpers.js";

const prisma = new PrismaClient();

const deleteUser = async ({ id }) => {
    await validateUser(id);

    const deletedUser = await prisma.user.delete({
        where: { id }
    })

    return deletedUser.id
}

export default deleteUser