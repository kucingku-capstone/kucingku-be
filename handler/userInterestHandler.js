import UserInterest from '../model/userInterestModel.js';
import path from 'path';
import fs from 'fs';

export const getUserInterest = async (req, res) => {
    try {
        const response = await UserInterest.find();
        res.json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const getUserInterestById = async (req, res) => {
    try {
        const response = await UserInterest.findOne({ _id: req.params.id });
        res.json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const saveUserInterest = async (req, res) => {
    try {

        const { cat_Breeds, cat_Activity, cat_Color, cat_Fur, cat_FurTexture, cat_UndercoatPattern } = req.body;

        await UserInterest.create({
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
    };
}

export const updateUserInterest = async (req, res) => {
    try {
        const userInterest = await UserInterest.findById(req.params.id);

        if (!userInterest) {
            return res.status(404).json({ msg: 'No Data Found' });
        }

        // Update the database with the new information
        await UserInterest.findByIdAndUpdate(
            req.params.id,
            {
                cat_Breeds: req.body.cat_Breeds || userInterest.cat_Breeds,
                cat_Activity: req.body.cat_Activity || userInterest.cat_Activity,
                cat_Color: req.body.cat_Color || userInterest.cat_Color,
                cat_Fur: req.body.cat_Fur || userInterest.cat_Fur,
                cat_FurTexture: req.body.cat_FurTexture || userInterest.cat_FurTexture,
                cat_UndercoatPattern: req.body.cat_UndercoatPattern || userInterest.cat_UndercoatPattern,
            },
            { new: true } // Return the updated document
        );

        res.status(200).json({ msg: 'UserInterest Updated Successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// userInterestHandler.js

export const deleteUserInterest = async (req, res) => {
    try {
        const userInterest = await UserInterest.findById(req.params.id);

        if (!userInterest) {
            return res.status(404).json({ msg: 'No Data Found' });
        }

        await userInterest.deleteOne(); // Use deleteOne to remove the document
        res.status(200).json({ msg: 'UserInterest Deleted Successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
