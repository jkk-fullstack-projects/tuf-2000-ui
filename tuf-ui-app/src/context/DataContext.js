import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

import { collection, query, where, getDocs } from 'firebase/firestore';
import db from '../utils/firebaseConfig';
import { adjustDateToStartOfDay, adjustDateToEndOfDay } from '../utils/DateUtils.js'

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [selectedTimestamp, setSelectedTimestamp] = useState(null);
    const [fetchedData, setFetchedData] = useState([]);
    const [dateRange, setDateRange] = useState([{
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      }]);
    const [filteredTimestamps, setFilteredTimestamps] = useState([]);

    const fetchTimestampsFromDateRange = async () => {
        let { startDate, endDate } = dateRange[0];    
        // Convert startDate and endDate to strings that match the Firestore format
        const startString = startDate.toISOString().split('.')[0] + "Z"; 
        const endString = endDate.toISOString().split('.')[0] + "Z";
        const timestamps = [];
    
        const dbQuery = query(
            collection(db, 'datasets'), 
            where("timestamp", ">=", startString), 
            where("timestamp", "<=", endString)
        );
    
        const querySnapshot = await getDocs(dbQuery);
        querySnapshot.forEach((doc) => {
            timestamps.push(doc.data().timestamp);
        });
    
        return timestamps;
    };

    useEffect(() => {
        setFetchedData([]); //Clear previous data when a new timestamp is selected
        setSelectedTimestamp(null); //Clear previous timestamp when a new timestamp is selected  
        fetchTimestampsFromDateRange()
            .then(setFilteredTimestamps);
    }, [dateRange]);

    useEffect(() => {
        async function fetchData() {
            if (selectedTimestamp) {
                console.log("Fetching data for timestamp:", selectedTimestamp);

                try {
                    const response = await axios.get(`/api/data?timestamp=${encodeURIComponent(selectedTimestamp)}`);
                    console.log("Data retrieval succeeded:", response.data);
                    setFetchedData(response.data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setFetchedData([]);
                }
            }
        }
        fetchData();
    }, [selectedTimestamp]);

    return(
        <DataContext.Provider 
            value={{ 
                selectedTimestamp, 
                setSelectedTimestamp, 
                fetchedData,
                setFetchedData,
                dateRange,
                setDateRange,
                filteredTimestamps,
            }}>
                    {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);