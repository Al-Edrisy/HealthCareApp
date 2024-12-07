// src/backend/models/firestoreModels.js
import { db } from '../config/firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

/**
 * Add or update health tips for a user in Firestore
 * @param {string} userId - The ID of the user.
 * @param {Array} healthTips - Array of health tips.
 * @returns {Promise<void>}
 */
export const addOrUpdateHealthTips = async (userId, healthTips) => {
    try {
        const userHealthTipsRef = collection(db, 'healthTips');
        const q = query(userHealthTipsRef, where('userId', '==', userId));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            // If no existing document, create one
            await addDoc(userHealthTipsRef, {
                userId,
                healthTips,
                createdAt: new Date()
            });
        } else {
            // If document exists, update it
            querySnapshot.forEach(async (doc) => {
                await updateDoc(doc.ref, {
                    healthTips,
                    updatedAt: new Date()
                });
            });
        }
    } catch (error) {
        console.error('Error adding/updating health tips:', error);
        throw new Error('Failed to add or update health tips');
    }
};

/**
 * Get health tips for a specific user
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Array>} - The list of health tips.
 */
export const getHealthTips = async (userId) => {
    try {
        const q = query(collection(db, 'healthTips'), where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
        const healthTips = [];
        querySnapshot.forEach((doc) => {
            healthTips.push(doc.data());
        });
        return healthTips;
    } catch (error) {
        console.error('Error fetching health tips:', error);
        throw new Error('Failed to fetch health tips');
    }
};
