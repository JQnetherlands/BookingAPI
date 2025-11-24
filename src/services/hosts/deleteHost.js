import { PrismaClient } from "../../generated/prisma/client.js";
import { validateHost } from "../../utils/bookingHelpers.js";

const prisma = new PrismaClient();

const deleteHost = async ({ id }) => {
    await validateHost(id);

    const deletedHost = await prisma.host.delete({
        where: { id }
    })

    return deletedHost
}

export default deleteHost