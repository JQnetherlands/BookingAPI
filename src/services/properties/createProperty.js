import BadRequestError from "../../errors/BadRequestError.js";
import { PrismaClient } from "../../generated/prisma/client.js";
import { validateHost } from "../../utils/bookingHelpers.js";
import { toNumber } from "../../utils/toNumber.js";
import {
  validateInteger,
  validateNumber,
  validatePositive,
  validateRange,
  validateRequired,
  validateString,
} from "../../utils/validate.js";

const prisma = new PrismaClient();

const createProperty = async ({
  hostId,
  title,
  description,
  location,
  pricePerNight,
  bedroomCount,
  bathRoomCount,
  maxGuestCount,
  rating,
}) => {
 try {
    validateRequired(
    {
      hostId,
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      rating,
    },
    [
      "hostId",
      "title",
      "description",
      "location",
      "pricePerNight",
      "bedroomCount",
      "bathRoomCount",
      "maxGuestCount",
      "rating",
    ]
  );

  pricePerNight = toNumber(pricePerNight, "pricePerNight");
  bedroomCount = toNumber(bedroomCount, "bedroomCount");
  bathRoomCount = toNumber(bathRoomCount, "bathRoomCount");
  maxGuestCount = toNumber(maxGuestCount, "maxGuestCount");
  rating = toNumber(rating, "rating");

  const required = {
    hostId,
    title,
    description,
    location,
    pricePerNight,
    bathRoomCount,
    bedroomCount,
    maxGuestCount,
    rating,
  };

  validateString(required, ["title", "description", "location"]);

  validateNumber(required, [
    "pricePerNight",
    "bedroomCount",
    "bathRoomCount",
    "maxGuestCount",
    "rating",
  ]);

  validateInteger(required, [
    "bedroomCount",
    "bathRoomCount",
    "maxGuestCount",
    "rating",
  ]);

  validatePositive(required, [
    "pricePerNight",
    "bedroomCount",
    "bathRoomCount",
    "maxGuestCount",
  ]);

   validateRange(required, "rating", 0, 5);
 } catch (error) {
   throw new BadRequestError(error.message);
 }
 
  await validateHost(hostId)

  const property = await prisma.property.create({
    data: {
      hostId,
      title,
      description,
      location,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      pricePerNight,
      rating,
    },
  });

  return property;
};

export default createProperty;
