import Cat from "../model/CatModel.js";
import path from "path";
import fs from "fs";

export const getCat = async (req, res) => {
    try {
        const response = await Cat.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getCatById = async (req, res) => {
    try {
        const response = await Cat.findOne({
            where: {
                id: req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const saveCat = (req, res) => {
    if (req.files === null) return res.status(400).json({ msg: "No File Uploaded" });
    const name = req.body.name;
    const age = req.body.age;
    const gender = req.body.gender;
    const size = req.body.size;
    const coat = req.body.coat;
    const breed = req.body.breed;
    const description = req.body.description;
    const file = req.files.image;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg'];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

    file.mv(`./public/images/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ msg: err.message });
        try {
            await Cat.create({ name: name, age: age, gender: gender, size: size, coat: coat, breed: breed, description: description, image: fileName, url: url });
            res.status(201).json({ msg: "Cat Created Successfuly" });
        } catch (error) {
            console.log(error.message);
        }
    })

}

export const updateCat = async (req, res) => {
    try {
        const cat = await Cat.findOne({
            where: { id: req.params.id },
        });

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
            await file.mv(newImagePath);

            // Update the database with the new image information
            await Cat.update(
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
                },
                {
                    where: { id: req.params.id },
                }
            );

            res.status(200).json({ msg: 'Cat Updated Successfully' });
        } else {
            // Update other fields in the database even if no new image is provided
            await Cat.update(
                {
                    name: req.body.name || cat.name,
                    age: req.body.age || cat.age,
                    gender: req.body.gender || cat.gender,
                    size: req.body.size || cat.size,
                    coat: req.body.coat || cat.coat,
                    breed: req.body.breed || cat.breed,
                    description: req.body.description || cat.description,
                },
                {
                    where: { id: req.params.id },
                }
            );

            res.status(200).json({ msg: 'Cat Updated Successfully' });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

export const deleteCat = async(req, res)=>{
    const cat = await Cat.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!cat) return res.status(404).json({msg: "No Data Found"});

    try {
        const filepath = `./public/images/${cat.image}`;
        fs.unlinkSync(filepath);
        await Cat.destroy({
            where:{
                id : req.params.id
            }
        });
        res.status(200).json({msg: "Cat Deleted Successfuly"});
    } catch (error) {
        console.log(error.message);
    }
}
