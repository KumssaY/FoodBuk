import mongoose from "mongoose";

const foodmenuSchema = new mongoose.Schema(
  {
    foodmenuId: {
      type: String,
      required: true,
    },
    fooditem: {
      type: String,
      required: true,
    },
    foodprice: {
        type: Number,
        required: true,
    },
    availability: {
      type: Boolean,
      required: true,
    },
  },
);

const Foodmenu = mongoose.model("Foodmenu", foodmenuSchema);

export {foodmenuSchema};

export default Foodmenu;
