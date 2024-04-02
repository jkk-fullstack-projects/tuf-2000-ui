"use client"; 
// This is a client-side component, 
// this is required by the next.js framework 
// to render the component on the client-side

import React from "react";
import { useData } from "../../../context/DataContext";
import mockData from "../../../../mock_data/Mocked_meter_data.json";

const Sidebar = () => {
    const { setSelectedTimestamp } = useData();

    return (
    <div className="sidebar">
        <h4>Sidebar</h4>
        {mockData.map((session, index) => (
            <div key={index} onClick={() => setSelectedTimestamp(session.timestamp)}>
                {session.timestamp}
            </div>
        ))}
    </div>
    );
};

export default Sidebar;