import Cat from '../model/CatModel.js';
import path from 'path';
import fs from 'fs/promises';

export const getCat = async (req, res) => {
    try {
        const response = await Cat.find();
        res.json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const getCatById = async (req, res) => {
    try {
        const response = await Cat.findOne({ _id: req.params.id });
        res.json(response);
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

        const { name, age, gender, size, coat, breed, description } = req.body;
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

            await Cat.create({
                name,
                age,
                gender,
                size,
                coat,
                breed,
                description,
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
        const cat = await Cat.findById(req.params.id);

        if (!cat) {
            return res.status(404).json({ msg: 'No Data Found' });
        }

        let fileName = cat.image;

        if (req.files && req.files.image) {
            const file = req.files.image;
            const fileSize = file.size;
            const ext = path.extname(file.name);
            fileName = `${file.md5}${ext}`;
            const allowedTypes = ['.png', '.jpg', '.jpeg'];

            if (!allowedTypes.includes(ext.toLowerCase())) {
                return res.status(422).json({ msg: 'Invalid Image Type' });
            }

            if (fileSize > 5000000) {
                return res.status(422).json({ msg: 'Image must be less than 5 MB' });
            }

            const oldImagePath = `./public/images/${cat.image}`;
            await fs.unlink(oldImagePath);

            const newImagePath = `./public/images/${fileName}`;
            await fs.writeFile(newImagePath, file.data);

            // Update the database with the new image information
            await Cat.findByIdAndUpdate(
                req.params.id,
                {
                    name: req.body.name || cat.name,
                    age: req.body.age || cat.age,
                    gender: req.body.gender || cat.gender,
                    size: req.body.size || cat.size,
                    coat: req.body.coat || cat.coat,
                    breed: req.body.breed || cat.breed,
                    image: fileName,
                    description: req.body.description || cat.description,
                    url: `${req.protocol}://${req.get('host')}/images/${fileName}`,
                }
            );

            res.status(200).json({ msg: 'Cat Updated Successfully' });
        } else {
            // Update other fields in the database even if no new image is provided
            await Cat.findByIdAndUpdate(
                req.params.id,
                {
                    name: req.body.name || cat.name,
                    age: req.body.age || cat.age,
                    gender: req.body.gender || cat.gender,
                    size: req.body.size || cat.size,
                    coat: req.body.coat || cat.coat,
                    breed: req.body.breed || cat.breed,
                    description: req.body.description || cat.description,
                }
            );

            res.status(200).json({ msg: 'Cat Updated Successfully' });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const deleteCat = async (req, res) => {
    const cat = await Cat.findById(req.params.id);

    if (!cat) return res.status(404).json({ msg: "No Data Found" });

    try {
        const filepath = `./public/images/${cat.image}`;

        // Check if the file exists before attempting to delete
        if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
        } else {
            console.log("File does not exist:", filepath);
        }

        await Cat.deleteOne({ _id: req.params.id });
        res.status(200).json({ msg: "Cat Deleted Successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
