export function UTCDateFromDayAmountHelper(days: number): string {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + days);
  return currentDate.toUTCString();
}
