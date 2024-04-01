"use client"; 
// This is a client-side component, 
// this is required by the next.js framework 
// to render the component on the client-side

import React, { useState } from "react";
import dynamic from 'next/dynamic';
const DateRangePicker = dynamic(() => import('react-date-range')
    .then((mod) => mod.DateRangePicker), {ssr: false,});
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import mockData from '../../../../mock_data/Mocked_meter_data.json';

console.log('Mocked Data import:', mockData)

const Sidebar = () => {
    const [state, setState] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection',
        },
    ]);
    const [fetchedData, setFetchedData] = useState(null);

    const handleFetchData = () => {
        // Simulate fetch data from the API
        console.log('Mocking Fetch data from the API');
        console.log(state[0].startDate, state[0].endDate);
        // a function call will be added to fetch data based on selected dates
        setTimeout(() => {
            // Directly use the mock data
            console.log('Fetched Data:', mockData)
            setFetchedData(mockData);
            // now the data can be passed to another component
          }, 1000); // Simulate network delay
    };
    

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
        <div className="fetch-data-button">
            <button onClick={handleFetchData}>Get Meter Data</button>
        </div>
        {/* Toggle Button */}
        <div className="toggle-button">
            {/* Toggle button component will be here */}
        </div>

        {/* List of Timestamps that can be choosed from */}
        <div className="timestamps">
            {/* Timestamps list will be rendered here */}
        </div>
        {fetchedData && (
        <div className="fetched-data">
            <h5>Fetched Data:</h5>
        {/* fetched data rendered here, adding a component later */}
            {fetchedData.data.map((item, index) => (
                <div key={index}>
                    {item.variableName}: {item.value} {item.unit}
                </div>
            ))}
        </div>
        )}
    </div>
    );
};

export default Sidebar;