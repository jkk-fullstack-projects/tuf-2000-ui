import React, { useContext } from "react";
import dynamic from 'next/dynamic';
import { DataContext } from '../../../context/DataContext.js';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import styles from './CustomDatePicker.module.css';
import { setStartOfDay, setEndOfDay } from '../utils/dateUtils.js';

const DateRangePicker = dynamic(() => import('react-date-range')
    .then((mod) => mod.DateRangePicker), {ssr: false });

/**
 * Custom date picker component that allows users to select date ranges.
 * Utilizes context for state management and dynamic imports for SSR compatibility.
 *
 * @component
 * @param {Object} props
 * @param {boolean} props.isCalendarVisible - Controls the visibility of the calendar.
 * @param {string} props.customHeight - Custom CSS height value for the calendar container.
 */

const CustomDatePicker = ({ isCalendarVisible, customHeight }) => {
    const { dateRange, setDateRange } = useContext(DataContext);

    /**
     * Handles date range selection from the DateRangePicker component.
     * Adjusts the start and end dates to the start/end of day for consistency.
     *
     * @param {Object} ranges - The selected date range from the picker.
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
     * Resets the selected date range to today's date.
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
    
    return (
        <div className={styles.datePickerContainer}>
            {isCalendarVisible && (
                <div className={styles.scrollableContainer} style={{ maxHeight: customHeight }}>
                    <DateRangePicker 
                        ranges={dateRange} 
                        onChange={handleSelect}
                        rangeColors={['#555', 'white', '#555']}
                    />
                    <div>
                        <button onClick={handleClearDates} 
                                    className={styles.controlButton}>Clear calendar dates
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomDatePicker;