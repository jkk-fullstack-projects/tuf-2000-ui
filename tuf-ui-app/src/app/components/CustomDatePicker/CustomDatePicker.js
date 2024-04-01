import React, { useState } from "react";
import dynamic from 'next/dynamic';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

// DateRangePicker imported dyanamically only on client side to avoid SSR issues
const DateRangePicker = dynamic(() => import('react-date-range')
    .then((mod) => mod.DateRangePicker), {ssr: false });

const CustomDatePicker = ({ onDatesChange }) => {
    const [dateRange, setDateRange] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection',
        },
    ]);
    const [showCalendar, setShowCalendar] = useState(true);

    const handleSelect = (ranges) => {
        const newRange = [ranges.selection];
        setDateRange(newRange);
        onDatesChange(ranges.selection);
    };

    const handleClearDates = () => {
        console.log('Clearing Dates');
        const resetRange = [{ startDate: new Date(), endDate: new Date(), key: 'selection' }];
        setDateRange(resetRange); // set the state with an array of new range
        onDatesChange(resetRange[0]); // pass the first element of the array
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
                    ranges={dateRange} // this is an array of objects
                    onChange={handleSelect}
                />
            )}
        </div>
    );
};

export default CustomDatePicker;