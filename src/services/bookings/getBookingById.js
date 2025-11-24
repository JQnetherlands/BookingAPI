import { validateBooking } from "../../utils/bookingHelpers.js";

const getBookingById = async ({ id }) => {
  const existingBooking = await validateBooking({ id });

  return existingBooking;
};

export default getBookingById;
