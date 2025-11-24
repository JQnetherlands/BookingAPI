export function getUTCDateOnly(date) {
  return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
}

export function calculateNights(checkinDate, checkoutDate) {
  const utcCheckin = getUTCDateOnly(checkinDate);
  const utcCheckout = getUTCDateOnly(checkoutDate);

  const msPerDay = 1000 * 60 * 60 * 24;

    const diff = (utcCheckout - utcCheckin) / msPerDay;
    
    if (diff <= 0) {
        throw new Error("checkoutDate must be at least 1 night after checkindate")
    }

    return diff;
}
