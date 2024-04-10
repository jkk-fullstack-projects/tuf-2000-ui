/**
 * Sets the time of a date object to the start of the day (00:00:00).
 * @param {Date} date - The date object to adjust.
 * @returns {Date} - A new date object set to the start of the day.
 */
export const setStartOfDay = (date) => {
    const adjustedDate = new Date(date);
    adjustedDate.setHours(0, 0, 0, 0);
    return adjustedDate;
  };
  
  /**
   * Sets the time of a date object to the end of the day (23:59:59).
   * @param {Date} date - The date object to adjust.
   * @returns {Date} - A new date object set to the end of the day.
   */
  export const setEndOfDay = (date) => {
    const adjustedDate = new Date(date);
    adjustedDate.setHours(23, 59, 59, 999);
    return adjustedDate;
  };