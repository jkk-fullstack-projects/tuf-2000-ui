import React, { useState } from "react";
import dynamic from 'next/dynamic';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const DateRangePicker = dynamic(() => import('react-date-range')
    .then((mod) => mod.DateRangePicker), {ssr: false,});

const CustomDatePicker = ({ onDatesChange }) => {
    const [dateRange, setDateRange] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection',
        },
    ]);
    const [showCalendar, setShowCalendar] = useState(true);

const handleClearDates = () => {
    console.log('Clearing Dates');
    const resetRange = { startDate: new Date(), endDate: new Date(), key: 'selection' };
    setDateRange([resetRange]);
    onDatesChange(resetRange);
};

const toggleShowCalendar = () => {
    console.log('Toggling calendar visibility');
    setShowCalendar(!showCalendar);
};

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
                ranges={[dateRange]}
                onChange={(item) => {
                    setDateRange([item.selection]);
                    onDatesChange(item.selection);
                }}
            />
            )}
        </div>
    );
};

export default CustomDatePicker;