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
        <>
            <div className={styles.sidebar}>
                <h4>TUF-2000M data</h4>
                {filteredTimestamps.map((timestamp, index) => (
                    <button 
                        key={index} 
                        onClick={() => setSelectedTimestamp(timestamp)}
                        className={`${styles.button} ${styles.buttonPrimary}`}
                    >
                            {timestamp}
                    </button>
                ))}
            </div>
        </>
    );
};

export default Sidebar;