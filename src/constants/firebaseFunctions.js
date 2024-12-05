
import { db } from '../constants/FireBaseConfig';
import { 
    collection, 
    addDoc, 
    getDocs, 
    query, 
    where, 
    updateDoc, 
    doc 
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
 * Adds a document to the 'medicalHistory' collection.
 * @param {string} userId - The ID of the user.
 * @param {Object} medicalHistoryData - Medical history data to save.
 * @returns {Promise<string>} - The ID of the added document.
 */
export const addMedicalHistoryData = async (userId, medicalHistoryData) => {
    try {
        const docRef = await addDoc(collection(db, 'medicalHistory'), { 
            userId, 
            ...medicalHistoryData 
        });
        return docRef.id;
    } catch (error) {
        console.error('Error adding medical history data:', error);
        throw error;
    }
};

/**
 * Fetches documents from the 'medicalHistory' collection for a specific user.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Array>} - List of documents from the collection.
 */
export const getMedicalHistoryData = async (userId) => {
    try {
        const q = query(collection(db, 'medicalHistory'), where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('Error fetching medical history data:', error);
        throw error;
    }
};

/**
 * Adds a document to the 'symptoms' collection.
 * @param {string} userId - The ID of the user.
 * @param {Object} symptomsData - Symptoms data to save.
 * @returns {Promise<string>} - The ID of the added document.
 */
export const addSymptomsData = async (userId, symptomsData) => {
    try {
        const docRef = await addDoc(collection(db, 'symptoms'), { 
            userId, 
            ...symptomsData 
        });
        return docRef.id;
    } catch (error) {
        console.error('Error adding symptoms data:', error);
        throw error;
    }
};

/**
 * Fetches documents from the 'symptoms' collection for a specific user.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Array>} - List of documents from the collection.
 */
export const getSymptomsData = async (userId) => {
    try {
        const q = query(collection(db, 'symptoms'), where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('Error fetching symptoms data:', error);
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
        console.log('Document updated successfully');
    } catch (error) {
        console.error('Error updating document:', error);
        throw error;
    }
};


///