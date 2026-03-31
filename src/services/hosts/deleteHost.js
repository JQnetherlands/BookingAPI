import prisma from "../../lib/prisma.js";
import { validateHost } from "../../utils/bookingHelpers.js";

const deleteHost = async ({ id }) => {
    await validateHost(id);

    const deletedHost = await prisma.host.delete({
        where: { id }
    })

    return deletedHost
}

export default deleteHost