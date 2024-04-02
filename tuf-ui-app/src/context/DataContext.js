import React, { createContext, useContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [selectedTimestamp, setSelectedTimestamp] = useState(null);
    const [fetchedData, setFetchedData] = useState(null);
    const [dateRange, setDateRange] = useState([{
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      }]);

    return(
        <DataContext.Provider 
            value={{ 
                selectedTimestamp, 
                setSelectedTimestamp, 
                fetchedData, 
                setFetchedData,
                dateRange,
                setDateRange, 
            }}>
                    {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);