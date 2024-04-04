import React, { useContext, useState } from "react";
import dynamic from 'next/dynamic';
import { DataContext } from '../../../context/DataContext';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import styles from './CustomDatePicker.module.css';

// DateRangePicker imported dyanamically: only on client side, to avoid SSR issues
const DateRangePicker = dynamic(() => import('react-date-range')
    .then((mod) => mod.DateRangePicker), {ssr: false });

const CustomDatePicker = () => {
    const { dateRange, setDateRange } = useContext(DataContext);
    const [showCalendar, setShowCalendar] = useState(true);

    const handleSelect = (ranges) => {

        const selectionStart = new Date(ranges.selection.startDate);
        selectionStart.setHours(0, 0, 0, 0); // Set start of the day
        const selectionEnd = new Date(ranges.selection.endDate);
        selectionEnd.setHours(23, 59, 59, 999); // Set end of the day        
        console.log('Date selected from picker:', ranges);

        const adjustedRange = {
            ...ranges.selection,
            startDate: new Date(ranges.selection.startDate.setHours(0, 0, 0, 0)),
            endDate: new Date(ranges.selection.endDate.setHours(23, 59, 59, 999)),
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

    const toggleShowCalendar = () => setShowCalendar(!showCalendar);

    return (
        <div className={styles.datePickerContainer}>
            <div className={styles.controls}>
                <button onClick={handleClearDates} className={styles.controlButton}>Clear Dates</button>
                <button onClick={toggleShowCalendar} className={styles.controlButton}>
                    {showCalendar ? 'Hide Calendar' : 'Show Calendar'}
                </button>
            </div>
            {showCalendar && (
                <DateRangePicker ranges={dateRange} onChange={handleSelect} />
            )}
        </div>
    );
};

export default CustomDatePicker;