"use client"; 
// This is a client-side component, 
// this is required by the next.js framework 
// to render the component on the client-side

import React, { useState } from "react";
import CustomDatePicker from "../CustomDatePicker/CustomDatePicker";
import DataFetcher from "../DataFetcher/DataFetcher";
import ShowRawData from "../ShowRawData/ShowRawData";
import mockData from '../../../../mock_data/Mocked_meter_data.json';

console.log('Mocked Data import:', mockData)

const Sidebar = () => {
    const [dateRange, setDateRange] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection',
        },
    ]);
    const [fetchedData, setFetchedData] = useState(null);

    return (
    <div className="sidebar">
        <h4>Sidebar</h4>
        <div className="date-picker">
            <CustomDatePicker onDatesChange={(range) => setDateRange(range)}/>
        </div>
        <DataFetcher dateRange={dateRange} />
        {/* Toggle Button */}
        <div className="toggle-button">
            {/* Toggle button component will be here */}
        </div>

        {/* List of Timestamps that can be choosed from */}
        <div className="timestamps">
            {/* Timestamps list will be rendered here */}
        </div>
        {fetchedData && (
            <ShowRawData fetchedData={fetchedData} />
        )}
    </div>
    );
};

export default Sidebar;