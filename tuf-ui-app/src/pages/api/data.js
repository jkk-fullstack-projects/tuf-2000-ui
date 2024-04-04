// pages/api/data.js
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import db from '../../utils/firebaseConfig';

export default async function handler(req, res) {
    const { startDate, endDate } = req.query;

    const startOfDay = `${startDate}T00:00:00`;
    const endOfDay = `${endDate}T23:59:59`;

    console.log(`Querying Firestore with startDate: ${startOfDay}, endDate: ${endOfDay}`);

    const dbQuery = query(
        collection(db, 'datasets'), 
        where("timestamp", ">=", startOfDay),
        where("timestamp", "<=", endOfDay)
    );

    try {
        const querySnapshot = await getDocs(dbQuery);
        const data = querySnapshot.docs.map(doc => doc.data());

        if (querySnapshot.empty) {
            return res.status(404)
                .json({ error: 'No data was found for the given date range' });
        }
        console.log("Data fetched:", data);
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data', details: error.message});
    }
};