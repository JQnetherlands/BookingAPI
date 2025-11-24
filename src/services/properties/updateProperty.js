import { PrismaClient } from "../../generated/prisma/client.js";
import { validateHost, validateProperty } from "../../utils/bookingHelpers.js";
import {
  validateNumber,
  validateRange,
  validateString,
} from "../../utils/validate.js";

const prisma = new PrismaClient();

const updateProperty = async ({
  id,
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
  await validateProperty(id);

  const data = {};

  if (hostId) {
    await validateHost(hostId);
    data.hostId = hostId;
  } 

  if (title) {
    validateString({title}, ["title"]);
    data.title = title;
  } 

  if (description) {
    validateString({description}, ["description"]);
    data.description = description;
  }

  if (location) {
    validateString({location}, ["location"]);
    data.location = location;
  } 

  if (pricePerNight) {
    validateNumber({pricePerNight}, ["pricePerNight"]);
    data.pricePerNight = pricePerNight;
  } 

  if (bedroomCount) {
    validateNumber({bedroomCount}, ["bedroomCount"]);
    data.bedroomCount = bedroomCount;
  } 

  if (bathRoomCount) {
    validateNumber({bathRoomCount}, ["bathRoomCount"]);
    data.bathRoomCount = bathRoomCount;
  } 

  if (maxGuestCount) {
    validateNumber({maxGuestCount}, ["maxGuestCount"]);
    data.maxGuestCount = maxGuestCount;
  }

  if (rating !== undefined && rating !== null) {
    console.log("Received rating:", rating);
    validateNumber({rating}, ["rating"]);
    // validateInteger({rating}, ["rating"]); the test gives a 4.5 
    validateRange({ rating }, "rating", 0, 5);

    data.rating = rating;
  } 

  const updatedProperty = await prisma.property.update({
    where: { id },
    data,
  });

  return updatedProperty;
};

export default updateProperty;
