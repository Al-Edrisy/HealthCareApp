import { db } from '../constants/FireBaseConfig';
import { 
    collection, 
    addDoc, 
    getDocs, 
    query, 
    where, 
    updateDoc, 
    doc, 
    deleteDoc, 
    getDoc, 
    serverTimestamp 
} from 'firebase/firestore';

/**
 * Adds a document to the 'lifestyle' collection.
 * @param {string} userId - The ID of the user.
 * @param {Object} lifestyleData - Lifestyle data to save.
 * @returns {Promise<string>} - The ID of the added document.
 */
export const addLifestyleData = async (userId, lifestyleData) => {
    try {
        const docRef = await addDoc(collection(db, 'lifestyle'), { 
            userId, 
            createdAt: serverTimestamp(),
            ...lifestyleData 
        });
        return docRef.id;
    } catch (error) {
        console.error('Error adding lifestyle data:', error);
        throw error;
    }
};

/**
 * Fetches documents from the 'lifestyle' collection for a specific user.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Array>} - List of documents from the collection.
 */
export const getLifestyleData = async (userId) => {
    try {
        const q = query(collection(db, 'lifestyle'), where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('Error fetching lifestyle data:', error);
        throw error;
    }
};

/**
 * Adds or updates health tips for a specific user.
 * @param {string} userId - The ID of the user.
 * @param {Array<string>} healthTips - Array of health tips.
 * @returns {Promise<void>}
 */
export const addOrUpdateHealthTips = async (userId, healthTips) => {
    try {
        const q = query(collection(db, 'healthTips'), where('userId', '==', userId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const docRef = querySnapshot.docs[0].ref;
            await updateDoc(docRef, {
                updatedAt: serverTimestamp(),
                healthTips,
            });
        } else {
            await addDoc(collection(db, 'healthTips'), {
                userId,
                createdAt: serverTimestamp(),
                healthTips,
            });
        }
    } catch (error) {
        console.error('Error adding/updating health tips:', error);
        throw error;
    }
};

/**
 * Fetches health tips for a specific user.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Object|null>} - The health tips document or null if not found.
 */
export const getHealthTips = async (userId) => {
    try {
        const q = query(collection(db, 'healthTips'), where('userId', '==', userId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            return querySnapshot.docs[0].data();
        } else {
            console.log('No health tips found for this user.');
            return null;
        }
    } catch (error) {
        console.error('Error fetching health tips:', error);
        throw error;
    }
};

/**
 * Fetches a single document from a collection by ID.
 * @param {string} collectionName - The name of the collection.
 * @param {string} docId - The ID of the document to fetch.
 * @returns {Promise<Object|null>} - The document data or null if not found.
 */
export const fetchDocumentById = async (collectionName, docId) => {
    try {
        const docRef = doc(db, collectionName, docId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            console.log('Document not found.');
            return null;
        }
    } catch (error) {
        console.error('Error fetching document:', error);
        throw error;
    }
};

/**
 * Deletes a document from a Firestore collection.
 * @param {string} collectionName - The name of the collection.
 * @param {string} docId - The ID of the document to delete.
 * @returns {Promise<void>}
 */
export const deleteDocument = async (collectionName, docId) => {
    try {
        const docRef = doc(db, collectionName, docId);
        await deleteDoc(docRef);
        console.log('Document deleted successfully.');
    } catch (error) {
        console.error('Error deleting document:', error);
        throw error;
    }
};

/**
 * Updates a document in a Firestore collection.
 * @param {string} collectionName - The name of the collection.
 * @param {string} docId - The ID of the document to update.
 * @param {Object} updatedData - The data to update in the document.
 * @returns {Promise<void>}
 */
export const updateDocument = async (collectionName, docId, updatedData) => {
    try {
        const docRef = doc(db, collectionName, docId);
        await updateDoc(docRef, updatedData);
        console.log('Document updated successfully.');
    } catch (error) {
        console.error('Error updating document:', error);
        throw error;
    }
};
