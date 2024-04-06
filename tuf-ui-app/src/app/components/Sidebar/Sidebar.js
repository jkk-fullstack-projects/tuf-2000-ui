"use client"; 
// This is a client-side component, 
// this is required by the next.js framework 
// to render the component on the client-side

import React from 'react';
import { useData } from '../../../context/DataContext';
import styles from './Sidebar.module.css';
import { format } from 'date-fns';

const Sidebar = ({ customHeight }) => {
    const { filteredTimestamps, setSelectedTimestamp } = useData();
    const sidebarStyle = {
        ...styles.sidebar,
        maxHeight: customHeight,
    };

    return (
        <div className={styles.sidebar} style={sidebarStyle}>
        <h4>Measurings:</h4>
        {filteredTimestamps.map((timestamp, index) => {
            // assuming the timestamp is in ISO String format
            const formattedDate = format(new Date(timestamp), 'yyyy-MM-dd');
            const formattedTime = format(new Date(timestamp), 'HH:mm:ss');

            return (
                <button
                    key={index}
                    className={styles.button}
                    onClick={() => setSelectedTimestamp(timestamp)}
                >
                    <div>{formattedDate}</div>
                    <div>{formattedTime}</div>
                </button>
            );
        })}
    </div>
    );
};

export default Sidebar;