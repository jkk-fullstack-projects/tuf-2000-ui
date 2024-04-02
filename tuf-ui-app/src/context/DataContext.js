import React, { createContext, useContext, useState, useEffect } from 'react';
import mockData from '../../mock_data/Mocked_meter_data.json';

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


    // Filter timestamps based on dateRange with custom hooks
    useEffect(() => {
        const startOfDay = (date) => new Date(new Date(date).setHours(0, 0, 0, 0));
        const endOfDay = (date) => new Date(new Date(date).setHours(23, 59, 59, 999));

        const start = startOfDay(dateRange[0].startDate).getTime();
        const end = endOfDay(dateRange[0].endDate).getTime();

        const filtered = mockData.filter(({ timestamp }) => {
            const dataDate = new Date(timestamp).getTime();
            return dataDate >= start && dataDate <= end;
        }).map(({ timestamp }) => timestamp);

        setFilteredTimestamps(filtered);
    }, [dateRange]);

    // Filter data based on selectedTimestamp
    useEffect(() => {
        if (selectedTimestamp) {
            const data = mockData.find(({ timestamp }) => timestamp === selectedTimestamp);
            setFetchedData(data ? [data] : []);
        } else {
            setFetchedData([]);
        }
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