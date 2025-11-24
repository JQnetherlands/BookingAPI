import { PrismaClient } from "../generated/prisma/client.js";
import BadRequestError from "../errors/BadRequestError.js";

const prisma = new PrismaClient();

export const validateHostUserName = async ({ username }) => {
  const existingUserName = await prisma.host.findUnique({
    where: { username },
  });

  if (existingUserName) {
    throw new BadRequestError("User has already reviewed this property");
  }
};
