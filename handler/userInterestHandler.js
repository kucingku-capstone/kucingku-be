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
        const { cat_Breeds, cat_Activity, cat_Color, cat_Fur, cat_FurTexture, cat_UndercoatPattern } = req.body;

        await userInterestCollection.add({
            cat_Breeds,
            cat_Activity,
            cat_Color,
            cat_Fur,
            cat_FurTexture,
            cat_UndercoatPattern
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
