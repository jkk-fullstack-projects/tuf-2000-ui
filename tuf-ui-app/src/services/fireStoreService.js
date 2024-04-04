import { collection, query, where, getDocs } from 'firebase/firestore';
import db from '../utils/firebaseConfig';

/**
 * Fetches timestamps from Firestore within a specified date range.
 * @param {Date} startDate - The start date of the range.
 * @param {Date} endDate - The end date of the range.
 * @returns {Promise<Array<string>>} - A promise that resolves to an array of timestamps.
 */

export const fetchTimestampsFromDateRange = async (startDate, endDate) => {
    const startString = startDate.toISOString().split('.')[0] + "Z";
    const endString = endDate.toISOString().split('.')[0] + "Z";
    const timestamps = [];

    const dbQuery = query(
        collection(db, 'datasets'),
        where("timestamp", ">=", startString),
        where("timestamp", "<=", endString)
    );

    const querySnapshot = await getDocs(dbQuery);
    querySnapshot.forEach((doc) => {
        timestamps.push(doc.data().timestamp);
    });

    return timestamps;
};