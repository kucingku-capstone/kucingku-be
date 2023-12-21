import Cat from '../model/CatModel.js';
import path from 'path';
import fs from 'fs';

export const getCat = async (req, res) => {
    try {
        const snapshot = await Cat.get();
        const response = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const getCatById = async (req, res) => {
    try {
        const doc = await Cat.doc(req.params.id).get();
        if (!doc.exists) {
            return res.status(404).json({ msg: 'No Data Found' });
        }
        res.json({ id: doc.id, ...doc.data() });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const saveCat = async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ msg: 'No File Uploaded' });
        }

        const { cat_name, cat_age, cat_gender, cat_size, cat_breed } = req.body;
        const file = req.files.image;
        const allowedTypes = ['.png', '.jpg', '.jpeg'];

        const ext = path.extname(file.name);
        if (!allowedTypes.includes(ext.toLowerCase())) {
            return res.status(422).json({ msg: 'Invalid Image Type' });
        }

        const fileName = `${file.md5}${ext}`;
        const url = `${req.protocol}://${req.get('host')}/images/${fileName}`;
        const imagePath = `./public/images/${fileName}`;

        if (file.size > 5000000) {
            return res.status(422).json({ msg: 'Image must be less than 5 MB' });
        }

        file.mv(imagePath, async (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ msg: 'Error uploading file' });
            }

            await Cat.add({
                cat_name,
                cat_age, 
                cat_gender, 
                cat_size, 
                cat_breed,
                image: fileName,
                url,
            });

            res.status(201).json({ msg: 'Cat Created Successfully' });
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const updateCat = async (req, res) => {
    try {
        const catSnapshot = await Cat.doc(req.params.id).get();

        if (!catSnapshot.exists) {
            return res.status(404).json({ msg: 'No Data Found' });
        }

        const catData = catSnapshot.data();
        let fileName = catData.image;

        if (req.files && req.files.image) {
            const file = req.files.image;
            const ext = path.extname(file.name);
            fileName = `${file.md5}${ext}`;

            const oldImagePath = `./public/images/${catData.image}`;
            try {
                await fs.promises.stat(oldImagePath);
                await fs.promises.unlink(oldImagePath);
            } catch (error) {
                if (error.code === 'ENOENT') {
                    console.log("File does not exist:", oldImagePath);
                } else {
                    throw error;  // rethrow any other errors
                }
            }
            
            const imagePath = `./public/images/${fileName}`;
            await file.mv(imagePath);
        }

        await Cat.doc(req.params.id).update({
            cat_name: req.body.cat_name || catData.cat_name,
            cat_age: req.body.cat_age || catData.cat_age,
            cat_gender: req.body.cat_gender || catData.cat_gender,
            cat_size: req.body.cat_size || catData.cat_size,
            cat_breed: req.body.cat_breed || catData.cat_breed,
            image: fileName,
            url: `${req.protocol}://${req.get('host')}/images/${fileName}`,
        });

        res.status(200).json({ msg: 'Cat Updated Successfully' });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteCat = async (req, res) => {
    try {
        const catRef = Cat.doc(req.params.id);
        const doc = await catRef.get();

        if (!doc.exists) {
            return res.status(404).json({ msg: 'No Data Found' });
        }

        await catRef.delete();

        res.status(200).json({ msg: 'Cat Deleted Successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
