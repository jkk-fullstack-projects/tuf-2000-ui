"use client";

import React from "react";
import dynamic from 'next/dynamic';
const DateRangePicker = dynamic(() => import('react-date-range')
    .then((mod) => mod.DateRangePicker), {ssr: false,});
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const Sidebar = () => {
    const [state, setState] = React.useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection',
        },
      ]);

    return (
    <div className="sidebar">
        <h4>Sidebar</h4>

        {/* date range picker */}
        <div className="date-picker">
            <DateRangePicker
                ranges={[state[0]]}
                onChange={(item) => setState([item.selection])}
            />
        </div>

        {/* Toggle Button */}
        <div className="toggle-button">
            {/* Toggle button component will be here */}
        </div>

        {/* List of Timestamps that can be choosed from */}
        <div className="timestamps">
            {/* Timestamps list will be rendered here */}
        </div>
    </div>
    );
};

export default Sidebar;