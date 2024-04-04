import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Custom hook for fetching data based on a selected timestamp.
 * @param {string|null} selectedTimestamp - The selected timestamp for which to fetch data.
 * @returns {Array} - The fetched data and a function to set the selected timestamp.
 */

export const useFetchData = (selectedTimestamp) => {
    const [fetchedData, setFetchedData] = useState([]);

    useEffect(() => {
        const fetchData = async () =>{
            if (selectedTimestamp) {
                try {
                    const response = await axios.get(`/api/data?timestamp=${encodeURIComponent(selectedTimestamp)}`);
                    setFetchedData(response.data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setFetchedData([]);
                }
            }
        };

        fetchData();
    }, [selectedTimestamp]);

    return [fetchedData, setFetchedData];
};