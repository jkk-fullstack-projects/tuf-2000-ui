import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchTimestampsFromDateRange } from '../services/fireStoreService.js';
import { useFetchData as useFetchMeterData } from './custom_hooks/useFetchData.js';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [dateRange, setDateRange] = useState([{startDate: new Date(),endDate: new Date(),key: 'selection',}]);
    const [selectedTimestamp, setSelectedTimestamp] = useState(null);
    const [filteredTimestamps, setFilteredTimestamps] = useState([]);
    const [fetchedData, setFetchedData] = useFetchMeterData(selectedTimestamp);

    useEffect(() => {
        setFetchedData([]); //Clear previous data when a new timestamp is selected
        setSelectedTimestamp(null); //Clear previous timestamp when a new timestamp is selected  
        fetchTimestampsFromDateRange(dateRange[0].startDate, dateRange[0].endDate)
            .then(setFilteredTimestamps);
    }, [dateRange, setFetchedData]);

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