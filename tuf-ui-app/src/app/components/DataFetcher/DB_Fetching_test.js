import { collection, getDocs, query, where } from 'firebase/firestore';
import db from './firebaseConfig';

const fetchData = async () => {
  const q = query(collection(db, 'datasets'), where('timestamp', '==', selectedTimestamp));
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map(doc => doc.data());
  console.log(data);
};