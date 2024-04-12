"use client"; 
// This is a client-side component, 
// this is required by the next.js framework 
// to render the component on the client-side

import React from 'react';
import { useData } from '../../../context/DataContext';
import styles from './Sidebar.module.css';
import { format } from 'date-fns';

/**
 * Sidebar component that displays a list of selectable timestamps.
 * It allows the user to select a timestamp to view more detailed data.
 *
 * @component
 * @param {Object} props
 * @param {string} props.customHeight - Custom CSS value for the max-height property of the sidebar.
 * @returns JSX.Element
 */

const Sidebar = ({ customHeight }) => {
    const { filteredTimestamps, setSelectedTimestamp } = useData();
    const sidebarStyle = {
        ...styles.sidebar,
        maxHeight: customHeight,
    };

    return (
        <div id= "sidebar" className={styles.sidebar} style={{ maxHeight: customHeight }}>
        <h4><strong>Times:</strong></h4>
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