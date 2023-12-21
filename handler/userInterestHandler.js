import userInterestCollection from '../model/userInterestModel.js';

export const getUserInterest = async (req, res) => {
    try {
        const snapshot = await userInterestCollection.get();
        const response = [];
        snapshot.forEach((doc) => {
            response.push({ id: doc.id, ...doc.data() });
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const getUserInterestById = async (req, res) => {
    try {
        const doc = await userInterestCollection.doc(req.params.id).get();
        if (!doc.exists) {
            return res.status(404).json({ msg: 'No Data Found' });
        }
        res.json({ id: doc.id, ...doc.data() });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const saveUserInterest = async (req, res) => {
    try {
        const { user_gender, user_age, cat_age, cat_gender, cat_size, cat_breed } = req.body;

        await userInterestCollection.add({
            user_gender, user_age, cat_age, cat_gender, cat_size, cat_breed
        });

        res.status(201).json({ msg: 'UserInterest Created Successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const updateUserInterest = async (req, res) => {
    try {
        const userInterestRef = userInterestCollection.doc(req.params.id);
        const userInterest = await userInterestRef.get();

        if (!userInterest.exists) {
            return res.status(404).json({ msg: 'No Data Found' });
        }

        await userInterestRef.set(req.body, { merge: true });
        res.status(200).json({ msg: 'UserInterest Updated Successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteUserInterest = async (req, res) => {
    try {
        const userInterestRef = userInterestCollection.doc(req.params.id);
        const userInterest = await userInterestRef.get();

        if (!userInterest.exists) {
            return res.status(404).json({ msg: 'No Data Found' });
        }

        await userInterestRef.delete();
        res.status(200).json({ msg: 'UserInterest Deleted Successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const axios = require('axios');

export const processDataHandler = async (req, res) => {
    try {
        const { documentId } = req.body; // Assuming you're sending documentId in the POST body

        if (!documentId) {
            return res.status(400).json({ message: 'Document ID is required in the request body' });
        }

        // Fetch data from Firestore based on the provided document ID
        const specificDataFromFirestore = await getSpecificDataFromFirestore(documentId);

        if (!specificDataFromFirestore) {
            return res.status(404).json({ message: 'Specific data not found in Firestore for the provided ID' });
        }

        // Send specific data to Machine Learning API
        const modelApiUrl = "https://cat-pred-fix-go2ufjjvyq-et.a.run.app/recommend"; // Replace with your ML API URL
        const response = await axios.post(modelApiUrl, specificDataFromFirestore);

        // Return ML API response
        return res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Error processing data:', error);
        return res.status(500).json({ message: 'Failed to process data' });
    }
};
// Function to get specific fields from Firestore based on document ID
async function getSpecificDataFromFirestore(docId) {
    try {
        const docSnapshot = await userInterestCollection.doc(docId).get();

        if (docSnapshot.exists) {
            const data = docSnapshot.data();
            return {
                user_gender: data.user_gender,
                user_age: data.user_age,
                cat_age: data.cat_age,
                cat_gender: data.cat_gender,
                cat_size: data.cat_size,
                cat_breed: data.cat_breed,
            };
        }
        return null;
    } catch (error) {
        console.error('Error fetching data from Firestore:', error);
        throw error;
    }
};
