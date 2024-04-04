// utils/timestampUtils.js
/**
 * Formats a JavaScript Date object as a string in ISO format without timezone conversion.
 * @param {Date} date - The date to format.
 * @returns {string} - The formatted timestamp as a string.
 */
export const formatDateAsISOString = (date) => {
    return date.toISOString().split('.')[0] + "Z"; // Keep the 'Z' to indicate UTC but remove milliseconds
};

/**
 * Parses a timestamp string to a Date object without timezone conversion.
 * @param {string} timestamp - The timestamp string in ISO format.
 * @returns {Date} - The Date object.
 */
export const parseISOStringToDate = (timestamp) => {
    return new Date(timestamp);
};
