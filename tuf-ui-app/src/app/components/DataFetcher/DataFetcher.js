import { useEffect, useContext } from 'react';
import { DataContext } from '../../../context/DataContext';
import { collection, getDocs, query, where } from 'firebase/firestore';
import db from '../../../utils/firebaseConfig';
import { set } from 'date-fns';

const DataFetcher = () => {
    const { selectedTimestamp, setFetchedData } = useContext(DataContext);

    useEffect(() => {
        const fetchData = async () => {
            if (selectedTimestamp) {
                try {
                    const db_query = query(collection(db, 'datasets'), where('timestamp', '==', selectedTimestamp));
                    const querySnapshot = await getDocs(db_query);

                    if (!querySnapshot.empty) {
                        const dataForTimestamp = querySnapshot.docs.map(doc => doc.data());
                        console.log("Data retrieval succeeded:", dataForTimestamp);
                        setFetchedData(dataForTimestamp);
                    } else {
                        setFetchedData([]);
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setFetchedData([]);
                }
            }
        };

        fetchData();
    }, [selectedTimestamp, setFetchedData]);

    return null; // This component does not render anything
};

export default DataFetcher;
