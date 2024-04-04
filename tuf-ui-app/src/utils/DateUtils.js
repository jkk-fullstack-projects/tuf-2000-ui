/**
 * Adjusts a date to the start of the day in local time zone.
 * @param {Date} date - The date to adjust.
 * @returns {Date} - The adjusted date.
 */
export const adjustDateToStartOfDay = (date) => {
    return new Date(date.setHours(0, 0, 0, 0));
};

/**
 * Adjusts a date to the end of the day in local time zone.
 * @param {Date} date - The date to adjust.
 * @returns {Date} - The adjusted date.
 */
export const adjustDateToEndOfDay = (date) => {
    return new Date(date.setHours(23, 59, 59, 999));
};