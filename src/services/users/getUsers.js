import { PrismaClient } from "../../generated/prisma/client.js"
import NotFoundError from "../../errors/NotFoundError.js";
const prisma = new PrismaClient();

const getUsers = async ({username, email}) => {
    const where = {};

    if (username) {
        where.username = username;
    }

    if (email) {
        where.email = email;
    }

    const users = await prisma.user.findMany({
        where,
        select: { id: true,username: true, name: true, email: true, phoneNumber: true, pictureUrl: true }
    });

    if (users.length === 0 && (username || email)) {
        let identifier;

        if (username && email) {
            identifier = `username: ${username} and email: ${email}`;
        } else {
            identifier = username || email;
        }

        throw new NotFoundError("user", identifier);
    }
    
    return users;
}

export default getUsers