import { useEffect, useState } from 'react';
import mockData from '../../../mock_data/Mocked_meter_data.json';

export const useDateFiltering = (dateRange) => {
    const [filteredTimestamps, setFilteredTimestamps] = useState([]);

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

    return filteredTimestamps;
};
