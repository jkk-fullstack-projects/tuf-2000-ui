import React, { useContext, useState } from "react";
import dynamic from 'next/dynamic';
import { DataContext } from '../../../context/DataContext';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

// DateRangePicker imported dyanamically only on client side to avoid SSR issues
const DateRangePicker = dynamic(() => import('react-date-range')
    .then((mod) => mod.DateRangePicker), {ssr: false });

const CustomDatePicker = () => {
    const { dateRange, setDateRange } = useContext(DataContext);
    const [showCalendar, setShowCalendar] = useState(true);

    const handleSelect = (ranges) => {
        setDateRange([ranges.selection]); // Update the date range in context
    };

    const handleClearDates = () => {
        console.log('Clearing Dates');
        const resetRange = [{ startDate: new Date(), endDate: new Date(), key: 'selection' }];
        setDateRange(resetRange); // set the state with an array of new range
    };

    const toggleShowCalendar = () => setShowCalendar(!showCalendar);

    return (
        <div className="date-picker">
            {showCalendar && (
                <button onClick={handleClearDates}>Clear Dates</button>
            )}
            <button onClick={toggleShowCalendar}>
                {showCalendar ? 'Hide Calendar' : 'Show Calendar'}
            </button>
            {showCalendar && (
                <DateRangePicker 
                    ranges={dateRange} 
                    onChange={handleSelect}
                />
            )}
        </div>
    );
};

export default CustomDatePicker;