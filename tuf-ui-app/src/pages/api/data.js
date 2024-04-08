import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import db from '../../utils/firebaseConfig';

/**
 * API handler for fetching TUF-2000M measurement data from Firestore based on a timestamp.
 * This handler responds to HTTP GET requests with a query parameter specifying the timestamp.
 * If data for the given timestamp is found, it returns this data with a 200 status code.
 * If no data is found for the given timestamp, it responds with a 404 status code.
 * Any errors during data retrieval result in a 500 status code response.
 *
 * @param {Object} req - The HTTP request object, expected to contain a `timestamp` query parameter.
 * @param {Object} res - The HTTP response object used to send back the appropriate response to the client.
 * @returns {Promise<void>} A promise that resolves to void. The function itself does not return a value but rather
 * sends a response using the `res` object.
 */
export default async function handler(req, res) {
    const { timestamp } = req.query;
    const dbQuery = query(collection(db, 'datasets'), where("timestamp", "==", timestamp));

    try {
        const querySnapshot = await getDocs(dbQuery);
        const data = querySnapshot.docs.map(doc => doc.data());

        if (querySnapshot.empty) {
            return res.status(404)
                .json({ error: 'No data was found for the given date range' });
        }
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data', details: error.message});
    }
};