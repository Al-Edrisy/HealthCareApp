// src/backend/controllers/healthTipsController.js
import { addOrUpdateHealthTips, getHealthTips } from '../models/firestoreModels';

/**
 * Controller to add or update health tips for a user
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
export const addOrUpdateTips = async (req, res) => {
    const { userId, healthTips } = req.body;
    try {
        await addOrUpdateHealthTips(userId, healthTips);
        res.status(200).json({ message: 'Health tips saved successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving health tips.', error: error.message });
    }
};

/**
 * Controller to fetch health tips for a user
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
export const getUserHealthTips = async (req, res) => {
    const { userId } = req.params;
    try {
        const healthTips = await getHealthTips(userId);
        if (healthTips.length > 0) {
            res.status(200).json({ healthTips });
        } else {
            res.status(404).json({ message: 'No health tips found for this user.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching health tips.', error: error.message });
    }
};
