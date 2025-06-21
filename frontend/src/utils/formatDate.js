import { format, formatDistanceToNow, isThisYear, isToday, isYesterday } from 'date-fns';

/**
 * Formats a date for display
 * @param {number|string|Date} dateValue - Date to format (timestamp, date string, or Date object)
 * @param {string} formatString - Optional format string for date-fns
 * @returns {string} Formatted date string
 */
export const formatDate = (dateValue, formatString = 'MMM d, yyyy') => {
  if (!dateValue) return '';
  
  const date = new Date(dateValue);
  return format(date, formatString);
};

/**
 * Formats a date as a relative time (e.g., "2 hours ago", "yesterday")
 * @param {number|string|Date} dateValue - Date to format
 * @returns {string} Relative time string
 */
export const formatRelativeDate = (dateValue) => {
  if (!dateValue) return '';
  
  const date = new Date(dateValue);
  
  if (isToday(date)) {
    return formatDistanceToNow(date, { addSuffix: true });
  } else if (isYesterday(date)) {
    return 'Yesterday';
  } else if (isThisYear(date)) {
    return format(date, 'MMM d');
  } else {
    return format(date, 'MMM d, yyyy');
  }
};

/**
 * Formats a date range (e.g., "May 2020 - Present", "Jan 2018 - Dec 2019")
 * @param {string} startDate - Start date string (YYYY-MM-DD)
 * @param {string|null} endDate - End date string (YYYY-MM-DD) or null if current
 * @param {boolean} currentlyActive - Whether this is a current position/education
 * @returns {string} Formatted date range
 */
export const formatDateRange = (startDate, endDate, currentlyActive = false) => {
  if (!startDate) return '';
  
  const start = new Date(startDate);
  const startFormatted = format(start, 'MMM yyyy');
  
  if (currentlyActive || !endDate) {
    return `${startFormatted} - Present`;
  }
  
  const end = new Date(endDate);
  const endFormatted = format(end, 'MMM yyyy');
  
  return `${startFormatted} - ${endFormatted}`;
};

/**
 * Calculates the duration between two dates in years and months
 * @param {string} startDate - Start date string (YYYY-MM-DD)
 * @param {string|null} endDate - End date string (YYYY-MM-DD) or null if current
 * @returns {string} Duration string (e.g., "2 yrs 3 mos")
 */
export const calculateDuration = (startDate, endDate) => {
  if (!startDate) return '';
  
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  
  const diffInMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  
  const years = Math.floor(diffInMonths / 12);
  const months = diffInMonths % 12;
  
  let durationString = '';
  
  if (years > 0) {
    durationString += `${years} yr${years > 1 ? 's' : ''}`;
  }
  
  if (months > 0) {
    if (durationString) durationString += ' ';
    durationString += `${months} mo${months > 1 ? 's' : ''}`;
  }
  
  if (!durationString) {
    // Less than a month
    durationString = '< 1 mo';
  }
  
  return durationString;
};

export default {
  formatDate,
  formatRelativeDate,
  formatDateRange,
  calculateDuration,
};