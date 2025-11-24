import BadRequestError from "../../errors/BadRequestError.js";
import { PrismaClient } from "../../generated/prisma/client.js";

const prisma = new PrismaClient();

const createUser = async ({
  username,
  password,
  name,
  email,
  phoneNumber,
  pictureUrl,
}) => {

  if (!username) throw new BadRequestError("Username is missing");
  if (!password) throw new BadRequestError("Password missing");
  if (!name) throw new BadRequestError("Name is missing");
  if (!email) throw new BadRequestError("Email is missing");
  if (!phoneNumber) throw new BadRequestError("Phonenumber is missing");
  if (!pictureUrl) throw new BadRequestError("PictureUrl missing");

  const alreadyUserName = await prisma.user.findUnique({
    where: { username },
  });

  if (alreadyUserName) {
    throw new BadRequestError("Username already exist");
  }

  const user = await prisma.user.create({
    data: {
      username,
      password,
      name,
      email,
      phoneNumber,
      pictureUrl,
    },
  });
  const { password: _pw, ...safeUser } = user;
  return safeUser;
};

export default createUser;
