import React, { useEffect } from 'react';
import { useData } from '@/context/DataContext';

const DataFetcher = () => {
    const { selectedTimestamp, setFetchedData } = useData();

    useEffect(() => {
        if (selectedTimestamp) {
            // Fetch data based on selectedTimestamp
            const fetchData = async () => {
                const fetchedData = {};
                setFetchedData(fetchedData);
            };

            fetchData();
        }
    }, [selectedTimestamp, setFetchedData]);

    return null;
};

export default DataFetcher;
