"use client"; 
// This is a client-side component, 
// this is required by the next.js framework 
// to render the component on the client-side

import React from 'react';
import { useData } from '../../../context/DataContext';
import styles from './Sidebar.module.css';

const Sidebar = () => {
    const { filteredTimestamps, setSelectedTimestamp } = useData();

    return (
        <div className={styles.sidebar}>
        <h4>TUF-2000M data</h4>
        {filteredTimestamps.map((timestamp, index) => {
            const [date, time] = timestamp.split('T');
            const formattedTime = time.split('.')[0];
            return (
                <button
                    key={index}
                    className={styles.button}
                    onClick={() => setSelectedTimestamp(timestamp)}
                >
                    <div>{date}</div>
                    <div>{formattedTime}</div>
                </button>
            );
        })}
    </div>
    );
};

export default Sidebar;