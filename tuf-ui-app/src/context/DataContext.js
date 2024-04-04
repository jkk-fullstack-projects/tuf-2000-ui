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

        console.log('Original dateRange from picker at datacontext:', { startDate, endDate });

        // Adjust startDate and endDate to the beginning of the day in local time zone
        // handling some edge cases
        startDate = adjustDateToStartOfDay(startDate);       
        endDate = adjustDateToEndOfDay(endDate);

        console.log('Adjusted startDate and endDate for query at datacontext:', { startDate, endDate });


        // YYYY-MM-DD format
        const startTimestamp = startDate.toISOString().split('T')[0];
        const endTimestamp = endDate.toISOString().split('T')[0];
    
        console.log('Formatted startTimestamp and endTimestamp at datacontext:', { startTimestamp, endTimestamp });

        const timestamps = [];
      
        const dbQuery = query(collection(db, 'datasets'), 
            where("timestamp", ">=", startTimestamp), 
            where("timestamp", "<=", endTimestamp)
        );

        console.log('Formatted startTimestamp and endTimestamp at datacontext:', { startTimestamp, endTimestamp });


        const querySnapshot = await getDocs(dbQuery);
        querySnapshot.forEach((doc) => {
            timestamps.push(doc.data().timestamp);
        });
    
        console.log('Fetched timestamps at dataconte:', timestamps);

        return timestamps;
    };

    useEffect(() => {
        fetchTimestampsFromDateRange()
            .then(setFilteredTimestamps);
    }, [dateRange]);

    useEffect(() => {
        async function fetchData() {
            if (selectedTimestamp) {
                console.log("Fetching data for timestamp:", selectedTimestamp);
                try {
                    const formattedDate = selectedTimestamp.split('T')[0]; // Extracts date part
                    const response = await axios.get(`/api/data?startDate=${formattedDate}&endDate=${formattedDate}`)
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