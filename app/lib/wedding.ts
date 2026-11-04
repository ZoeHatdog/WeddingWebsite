export const WEDDING_DATE = "2027-04-26T00:00:00+08:00";

export function daysUntilWedding(now = Date.now()) {
  return Math.ceil((new Date(WEDDING_DATE).getTime() - now) / 86_400_000);
}

export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Lakehall+at+Nena%27s+Sanctuary+Cabuyao+Laguna";
