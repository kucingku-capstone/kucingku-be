import UserInterest from "../model/userInterestModel.js";

export const getUserInterest = async (req, res) => {
    try {
        const response = await UserInterest.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getUserInterestById = async (req, res) => {
    try {
        const response = await UserInterest.findOne({
            where: {
                id: req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const saveUserInterest = (req, res) => {
    const cat_Breeds = JSON.stringify(req.body.cat_Breeds);
    const cat_Activity = JSON.stringify(req.body.cat_Activity);
    const cat_Color = JSON.stringify(req.body.cat_Color);
    const cat_Fur = JSON.stringify(req.body.cat_Fur);
    const cat_FurTexture = JSON.stringify(req.body.cat_FurTexture);
    const cat_UndercoatPattern = JSON.stringify(req.body.cat_UndercoatPattern);

    try {
        UserInterest.create({ cat_Breeds: cat_Breeds, cat_Activity: cat_Activity, cat_Color: cat_Color, cat_Fur: cat_Fur, cat_FurTexture: cat_FurTexture, cat_UndercoatPattern: cat_UndercoatPattern });
        res.status(201).json({ msg: "UserInterest Created Successfuly" });
    } catch (error) {
        console.log(error.message);
    }
}

export const updateUserInterest = async (req, res) => {
    try {
        const userInterest = await UserInterest.findOne({
            where: { id: req.params.id },
        });

        if (!userInterest) {
            return res.status(404).json({ msg: 'No Data Found' });
        }

        // Update the database with the new image information
        await UserInterest.update(
            {
                cat_Breeds: JSON.stringify(req.body.cat_Breeds) || userInterest.cat_Breeds,
                cat_Activity: JSON.stringify(req.body.cat_Activity) || userInterest.cat_Activity,
                cat_Color: JSON.stringify(req.body.cat_Color) || userInterest.cat_Color,
                cat_Fur: JSON.stringify(req.body.cat_Fur) || userInterest.cat_Fur,
                cat_FurTexture: JSON.stringify(req.body.cat_FurTexture) || userInterest.cat_FurTexture,
                cat_UndercoatPattern: JSON.stringify(req.body.cat_UndercoatPattern) || userInterest.cat_UndercoatPattern,
            },
            {
                where: { id: req.params.id },
            }
        );

        res.status(200).json({ msg: 'UserInterest Updated Successfully' });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

export const deleteUserInterest = async (req, res) => {
    const userInterest = await UserInterest.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!userInterest) return res.status(404).json({ msg: "No Data Found" });

    try {
        await UserInterest.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "UserInterest Deleted Successfuly" });
    } catch (error) {
        console.log(error.message);
    }
}
