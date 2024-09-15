import Foodmenu from "../models/Foodmenu.js";

/* READ */
export const getFoodMenu = async (req, res) => {
    try {
        const foodMenuItems = await Foodmenu.find();

        res.status(200).json(foodMenuItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAvailableFoodMenu = async (req, res) => {
    try {
        const foodMenuItems = await Foodmenu.find({ availability: true });

        res.status(200).json(foodMenuItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



/* UPDATE */
export const addFoodMenu = async (req, res) => {
    try {
        const { foodmenuId, fooditem, foodprice, availability } = req.body;

        const existingFoodMenuItem = await Foodmenu.findOne({ foodmenuId });

        if (existingFoodMenuItem) {
            return res.status(400).json({ message: 'Food menu item with this ID already exists.' });
        }

        const newFoodMenuItem = new Foodmenu({ foodmenuId, fooditem, foodprice, availability });

        await newFoodMenuItem.save();

        res.status(201).json(newFoodMenuItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* FUNCTION TO UPDATE FOOD AVAILABILITY */
export const updateFoodAvailability = async (foodmenuId, availability) => {
    try {
        const updatedFoodItem = await Foodmenu.findOneAndUpdate(
            { foodmenuId },
            { $set: { availability } },
            { new: true }
        );

        return updatedFoodItem;
    } catch (error) {
        throw new Error(error.message);
    }
};
