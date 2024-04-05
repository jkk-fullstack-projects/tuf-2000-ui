"use client"; 
// This is a client-side component, 
// this is required by the next.js framework 
// to render the component on the client-side

import React from 'react';
import { useData } from '../../../context/DataContext';
import styles from './Sidebar.module.css';
import { format } from 'date-fns';

const Sidebar = () => {
    const { filteredTimestamps, setSelectedTimestamp } = useData();

    return (
        <div className={styles.sidebar}>
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