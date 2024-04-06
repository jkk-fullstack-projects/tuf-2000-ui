/**
 * CustomDatePicker Component
 * Provides a date range picker for selecting start and end dates.
 * Utilizes `react-date-range` for the date range picker UI.
 * 
 * @component
 * @example
 * return (
 *   <CustomDatePicker />
 * )
 */

import React, { useContext } from "react";
import dynamic from 'next/dynamic';
import { DataContext } from '../../../context/DataContext.js';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import styles from './CustomDatePicker.module.css';
import { setStartOfDay, setEndOfDay } from '../utils/dateUtils.js';

/**
* DateRangePicker imported dynamically: 
* to be rendered only on client side, to avoid unnecessary SSR issues
*/
const DateRangePicker = dynamic(() => import('react-date-range')
    .then((mod) => mod.DateRangePicker), {ssr: false });

const CustomDatePicker = ({ isCalendarVisible, setIsCalendarVisible }) => {
    const { dateRange, setDateRange } = useContext(DataContext);

    const toggleShowCalendar = () => {
        setIsCalendarVisible(!isCalendarVisible);
    };

    /**
     * Handles the selection of dates from the DateRangePicker.
     * Adjusts the start and end dates to cover the entire selected days.
     * 
     * @param {Object} ranges - The selected date ranges.
     */
    const handleSelect = (ranges) => {
        const adjustedRange = {
            ...ranges.selection,
            startDate: setStartOfDay(ranges.selection.startDate),
            endDate: setEndOfDay(ranges.selection.endDate),
        };
        setDateRange([adjustedRange]);
    };

    /**
     * Clears the selected dates, resetting them to today's date.
     */
    const handleClearDates = () => {
        console.log('Clearing Dates');
        const today = new Date();
        setDateRange([{ 
            startDate: today, 
            endDate: today, 
            key: 'selection'
        }]);
    };
    
    /**
     * Toggles the visibility of the calendar.
     */
    //const toggleShowCalendar = () => setShowCalendar(!showCalendar);

    return (
        <div className={styles.datePickerContainer}>
            <div className={styles.controls}>
                <button onClick={handleClearDates} className={styles.controlButton}>Clear Dates</button>
                <button onClick={toggleShowCalendar} className={styles.controlButton}>
                    {isCalendarVisible ? 'Hide Calendar' : 'Show Calendar'}
                </button>
            </div>
            {isCalendarVisible && (
                <DateRangePicker 
                    ranges={dateRange} 
                    onChange={handleSelect}
                    rangeColors={['#555', 'white', 'white']}
                />
            )}
        </div>
    );
};

export default CustomDatePicker;