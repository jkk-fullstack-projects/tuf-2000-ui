import axios from 'axios';

export const testFirebaseConnection = async (timestamp) => {
    try {
        // Ensure the timestamp is URL-encoded in case it includes characters that need encoding
        const apiUrl = `/api/data?timestamp=${encodeURIComponent(timestamp)}`;
        const response = await axios.get(apiUrl);
        console.log('Firebase data:', response.data);
    } catch (error) {
        console.error('Error fetching data from Firebase:', error);
    }
};