// pages/api/data.js
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import db from '../../utils/firebaseConfig';

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