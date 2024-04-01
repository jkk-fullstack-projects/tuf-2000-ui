import React, { useEffect, useState } from "react";
import ShowRawData from "../ShowRawData/ShowRawData";
import mockData from '../../../../mock_data/Mocked_meter_data.json';

const DataFetcher = ({ dateRange }) => {
    const [fetchedData, setFetchedData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!dateRange.startDate || !dateRange.endDate) {
            // If no date range selected, does not fetch data
            return;
        }

        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                // Simulate fetch data
                setTimeout(() => {
                    setIsLoading(false);
                    setFetchedData(mockData);
                    console.log('fetchedData', fetchedData)
                    // now the data can be passed to another component
                }, 1000); // Simulate network delay
            } catch (error) {
                setIsLoading(false);
                setError('Failed to fetch data, please try again.' + error.message);
            }
        };

        fetchData();
    }, [dateRange]);

    return (
        <div className="sidebar">
            {isLoading && <p>Loading data...</p>}
            {error && <div className="error">{error}</div>}
            {fetchedData && <ShowRawData fetchedData={fetchedData}/>}
        </div>
        );
    };

export default DataFetcher;