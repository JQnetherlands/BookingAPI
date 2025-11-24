import { PrismaClient } from "../generated/prisma/client.js";
import NotFoundError from "../errors/NotFoundError.js";
const prisma = new PrismaClient();

export function getUTCDateOnly(date) {
  return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
}

export function calculateNights(checkinDate, checkoutDate) {
  const utcCheckin = getUTCDateOnly(checkinDate);
  const utcCheckout = getUTCDateOnly(checkoutDate);

  const msPerDay = 1000 * 60 * 60 * 24;

  const diff = (utcCheckout - utcCheckin) / msPerDay;

  if (diff <= 0) {
    throw new Error("checkoutDate must be at least 1 night after checkinDate");
  }

  return diff;
}

export const validateUser = async (userId) => {
    const user = await prisma.user.findUnique({
        where: { id: userId }
    });

    if (!user) throw new NotFoundError("user", userId);
    return user;
};

export const validateProperty = async (propertyId) => {
    const property = await prisma.property.findUnique({ where: { id: propertyId } });
    if (!property) throw new NotFoundError("property", propertyId);
    return property;
};


export const validateHost = async (hostId) => {
  const host = await prisma.host.findUnique({
    where: { id: hostId },
  });
  if (!host) throw new NotFoundError("host", hostId);
  return host;
};

export const validateBooking = async ({id}) => {
    const existingBooking = await prisma.booking.findUnique({
    where: { id },
  });

  if (!existingBooking) {
    throw new NotFoundError("booking", id);
  }
    
    return existingBooking;
}

export const validateDates = async (checkin, checkout, propertyId, bookingIdToExclude) => {
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);

    if (isNaN(checkinDate) || isNaN(checkoutDate)) {
        throw new Error("Invalid date format");
    }

    const nights = calculateNights(checkinDate, checkoutDate);

    const whereClause = {
        propertyId,
        AND: [
            { checkinDate: { lt: checkoutDate } },
            { checkoutDate: { gt: checkinDate } },
        ],
    };

    if (bookingIdToExclude) {
        whereClause.id = { not: bookingIdToExclude };
    }

    const overlapping = await prisma.booking.findFirst({
        where: whereClause });

    if (overlapping) {
        throw new Error(
            `Property is already booked from ${overlapping.checkinDate.toISOString()} to ${overlapping.checkoutDate.toISOString()}`
        );
    }

    return { checkin: checkinDate, checkout: checkoutDate, nights };
};

export const validateGuests = (numberOfGuests, maxGuests) => {
    if (numberOfGuests > maxGuests) {
        throw new Error(`numberOfGuests: ${numberOfGuests} is greater than the capacity of the property: ${maxGuests}`);
    }
    return numberOfGuests;
};

export const calculateTotalPrice = (checkin, checkout, pricePerNight, guests) => {
    const nights = calculateNights(checkin, checkout);

    return nights * pricePerNight * guests
}