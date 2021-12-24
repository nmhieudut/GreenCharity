export const DateUtils = {
  getDaysBetweenDates(startDate, endDate) {
    const begin = new Date(startDate);
    const end = new Date(endDate);
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const result = Math.round(begin - end) / millisecondsPerDay;
    return result > 0 ? result : 0;
  },
  calculateDaysFromNow(date) {
    const now = new Date();
    const point = new Date(date);
    const diff = point.getTime() - now.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  },
  // check if expired
  isExpired(date) {
    const now = new Date();
    const point = new Date(date);
    const diff = point.getTime() - now.getTime();
    return diff < 0;
  }
};
