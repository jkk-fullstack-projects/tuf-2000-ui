import { useEffect, useContext } from 'react';
import { DataContext } from '../../../context/DataContext';
import mockData from '../../../../mock_data/Mocked_meter_data.json';

const DataFetcher = () => {
    const { selectedTimestamp, setFetchedData } = useContext(DataContext);

    useEffect(() => {
        if (selectedTimestamp) {
            // Find the data for the selected timestamp
            const dataForTimestamp = mockData.find(data => data.timestamp === selectedTimestamp);
            // Update the context with the found data or an empty array if not found
            setFetchedData(dataForTimestamp ? [dataForTimestamp] : []);
        }
    }, [selectedTimestamp, setFetchedData]);

    return null; // This component does not render anything
};

export default DataFetcher;
