import { useEffect, useState } from 'react';
import mockData from '../../../mock_data/Mocked_meter_data.json'; // Adjust the path as necessary

export const useDataSelection = (selectedTimestamp) => {
    const [fetchedData, setFetchedData] = useState(null);

    useEffect(() => {
        if (selectedTimestamp) {
            const data = mockData.find(({ timestamp }) => timestamp === selectedTimestamp);
            setFetchedData(data);
        } else {
            setFetchedData(null);
        }
    }, [selectedTimestamp]);

    return fetchedData;
};
