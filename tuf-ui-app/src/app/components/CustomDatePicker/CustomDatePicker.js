import React, { useContext } from "react";
import dynamic from 'next/dynamic';
import { DataContext } from '../../../context/DataContext.js';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import styles from './CustomDatePicker.module.css';
import { setStartOfDay, setEndOfDay } from '../utils/dateUtils.js';


const DateRangePicker = dynamic(() => import('react-date-range')
    .then((mod) => mod.DateRangePicker), {ssr: false });

const CustomDatePicker = ({ isCalendarVisible }) => {
    const { dateRange, setDateRange } = useContext(DataContext);

    //const toggleShowCalendar = () => {
    //    setIsCalendarVisible(!isCalendarVisible);
    //};

    const handleSelect = (ranges) => {
        const adjustedRange = {
            ...ranges.selection,
            startDate: setStartOfDay(ranges.selection.startDate),
            endDate: setEndOfDay(ranges.selection.endDate),
        };
        setDateRange([adjustedRange]);
    };

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
            <div className={styles.controls}>
                <button onClick={handleClearDates} className={styles.controlButton}>Clear Dates</button>
            </div>
            {isCalendarVisible && (
                <DateRangePicker 
                    ranges={dateRange} 
                    onChange={handleSelect}
                    rangeColors={['#555', 'white', '#555']}
                />
            )}
        </div>
    );
};

export default CustomDatePicker;