import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

/**
 * Initializes Firebase using environment variables for configuration.
 * This module exports the Firestore database instance for use throughout the application.
 * It's designed to abstract away the Firebase initialization process and provide a single Firestore instance.
 *
 * The Firebase configuration is pulled from environment variables to ensure that sensitive information
 * (like API keys) is not hard-coded into the source code. This approach enhances security and makes
 * the configuration easily adjustable without requiring code changes.
 *
 * Usage of this module allows for a consistent and centralized Firestore instance that can be imported
 * wherever database interactions are needed within the application.
 *
 * @module FirestoreDB
 */

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
