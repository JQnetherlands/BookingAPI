import { PrismaClient } from "../../generated/prisma/client.js";
import NotFoundError from "../../errors/NotFoundError.js";

const prisma = new PrismaClient();

const getHosts = async ({ name }) => {
    const where = {};

    if (name) {
        where.name = name;
    }

    const hosts = await prisma.host.findMany({
        where
    });

    if (hosts.length === 0) {
        throw new NotFoundError("host", name ?? "any");
    }

    return hosts
}


export default getHosts