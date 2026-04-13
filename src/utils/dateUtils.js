import { differenceInWeeks, endOfDay } from "date-fns";

/**
 * Calculates remaining weeks until the end date
 * @param {Date|string} endDate - Target date for semester/subject end
 * @returns {number} Weeks left calculated conservatively
 */
export function getRemainingWeeks(endDate) {
  if (!endDate) return 0;
  
  const today = endOfDay(new Date());
  const end = endOfDay(new Date(endDate));
  
  if (end < today) return 0;

  // differenceInWeeks gives full weeks. Math.ceil could be used if partial weeks count,
  // but let's stick to adding an extra week for partials.
  const diffTime = Math.abs(end - today);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  
  return Math.ceil(diffDays / 7);
}

/**
 * Calculates total future classes based on date and class frequency
 * @param {Date|string} endDate - The end date
 * @param {number} classesPerWeek - Frequency
 * @returns {number} Estimated amount of remaining classes
 */
export function calculateFutureClasses(endDate, classesPerWeek) {
  const weeks = getRemainingWeeks(endDate);
  return weeks * classesPerWeek;
}
