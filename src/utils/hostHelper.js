import prisma from "../lib/prisma.js";
import BadRequestError from "../errors/BadRequestError.js";

export const validateHostUserName = async ({ username }) => {
  const existingUserName = await prisma.host.findUnique({
    where: { username },
  });

  if (existingUserName) {
    throw new BadRequestError("User name already in used");
  }
};
