import React, { useEffect } from 'react';
import { useData } from '@/context/DataContext';
import mockData from '../../../../mock_data/Mocked_meter_data.json';

const DataFetcher = () => {
    const { selectedTimestamp, setFetchedData } = useData();

    useEffect(() => {
        if (selectedTimestamp) {
            // Fetch data based on selectedTimestamp
            const dataForTimestamp = mockData.find((data) => data.timestamp === selectedTimestamp);
            setFetchedData(dataForTimestamp || {});
        }
    }, [selectedTimestamp, setFetchedData]);

    return null;
};

export default DataFetcher;
