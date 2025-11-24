import BadRequestError from "../../errors/BadRequestError.js";
import { PrismaClient } from "../../generated/prisma/client.js";
import { validateHostUserName } from "../../utils/hostHelper.js";
import {
  validateEmail,
  validateRequired,
  validateString,
} from "../../utils/validate.js";

const prisma = new PrismaClient();

const createHost = async ({
  username,
  password,
  name,
  email,
  phoneNumber,
  pictureUrl,
  aboutMe,
}) => {
  const required = {
    username,
    password,
    name,
    email,
    phoneNumber,
    pictureUrl,
    aboutMe,
  };

  try {
    validateRequired(required, [
      "username",
      "password",
      "name",
      "email",
      "phoneNumber",
      "aboutMe",
    ]);

    validateString(required, [
      "username",
      "password",
      "name",
      "email",
      "phoneNumber",
      "pictureUrl",
      "aboutMe",
    ]);

    validateEmail(required.email);
  } catch (err) {
      throw new BadRequestError(err.message)
  }

  await validateHostUserName({ username: username });
 

  const host = await prisma.host.create({
    data: {
      username: required.username,
      password: required.password,
      name: required.name,
      email: required.email,
      phoneNumber: required.phoneNumber,
      pictureUrl: required.pictureUrl,
      aboutMe: required.aboutMe,
    },
  });

  return host;
};

export default createHost;
