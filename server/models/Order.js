import mongoose from "mongoose";
import { foodmenuSchema } from "./Foodmenu.js";
import { paymentSchema } from "./Payment.js";

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    orders: [
      {
        order: foodmenuSchema,
        quantity: {
          type: Number,
          required: true,
          min: 1
        },
        foodprice: Number
      }
    ],
    total: Number,
    payment: paymentSchema,
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
export default Order;