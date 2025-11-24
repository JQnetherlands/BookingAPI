import { PrismaClient } from "../../generated/prisma/client.js";
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
  validateRequired,
  validateUsername,
} from "../../utils/validate.js";
import { validateUser } from "../../utils/bookingHelpers.js";
import BadRequestError from "../../errors/BadRequestError.js";

const prisma = new PrismaClient();

const updateUser = async ({
  id,
  username,
  password,
  name,
  email,
  phoneNumber,
  pictureUrl,
}) => {
  validateRequired({ id }, ["id"]);

  const existingUser = await validateUser(id)

  const data = {};

  if (username !== undefined) {
    const trimmedUsername = username.trim();
    if (trimmedUsername === "") throw new BadRequestError("username cannot be empty");
    validateUsername(trimmedUsername);

    if (trimmedUsername !== existingUser.username) {
      const userWithSameUsername = await prisma.user.findUnique({
        where: { username: trimmedUsername },
      });

      if (userWithSameUsername) {
        throw new BadRequestError(
          "username already taken please provide a different username"
        );
      }
    }
    data.username = trimmedUsername;
  }

  if (email && email !== existingUser.email) {
    validateEmail(email.trim());
    data.email = email.trim();
  }

  if (password !== undefined) {
    validatePassword(password);
    data.password = password;
  }

  if (name !== undefined) {
    const trimmedName = name.trim();
    if (trimmedName === "") throw new Error("name cannot be empty");

    validateName(trimmedName);

    data.name = trimmedName;
  }

  if (phoneNumber !== undefined) {
    validatePhone(phoneNumber);
    data.phoneNumber = phoneNumber;
  }

  if (pictureUrl !== undefined) data.pictureUrl = pictureUrl;

  const updatedUser = await prisma.user.update({
    where: { id },
    data,
  });
  const { password: _password, ...rest } = updatedUser;

  return rest;
};

export default updateUser;
