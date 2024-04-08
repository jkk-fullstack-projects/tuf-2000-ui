import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchTimestampsFromDateRange } from '../services/fireStoreService.js';
import { useFetchData as useFetchMeterData } from './custom_hooks/useFetchData.js';

/**
 * Context for managing and accessing data related to TUF-2000M measurement data.
 */
export const DataContext = createContext();

/**
 * Provides a context provider for TUF-2000M measurement data, including selected timestamp,
 * date range, fetched data, and filtered timestamps. It utilizes a custom hook for data fetching
 * based on the selected timestamp and manages the state related to date selection and data retrieval.
 *
 * @param {Object} props - Props object
 * @param {ReactNode} props.children - Child nodes to be rendered within the provider.
 * @returns {ReactNode} - A context provider wrapping the children.
 */
export const DataProvider = ({ children }) => {
    // State for managing selected date range.
    const [dateRange, setDateRange] = useState([{startDate: new Date(),endDate: new Date(),key: 'selection',}]);
    
    // State for managing the currently selected timestamp for fetching data.
    const [selectedTimestamp, setSelectedTimestamp] = useState(null);

    // State for storing timestamps filtered based on the selected date range.
    const [filteredTimestamps, setFilteredTimestamps] = useState([]);

    // Custom hook for fetching data based on the selected timestamp.
    const [fetchedData, setFetchedData] = useFetchMeterData(selectedTimestamp);

    useEffect(() => {
        // Clear fetched data and the selected timestamp when the date range changes,
        // then fetch new timestamps based on the updated date range.
        setFetchedData([]);
        setSelectedTimestamp(null); 
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

/**
 * Custom hook to access the DataContext for consuming the data related to TUF-2000M measurement data.
 * @returns {Object} The context value with access to selectedTimestamp, setDateRange, fetchedData, setFetchedData,
 * dateRange, setDateRange, and filteredTimestamps.
 */
export const useData = () => useContext(DataContext);