import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [selectedTimestamp, setSelectedTimestamp] = useState(null);
    const [fetchedData, setFetchedData] = useState(null);

    return(
        <DataContext.Provider 
            value={{ selectedTimestamp, setSelectedTimestamp, fetchedData, setFetchedData }}>
                {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);