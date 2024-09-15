import mongoose from "mongoose";
import User from "../models/User.js";
import Order from "../models/Order.js";
import Foodmenu from "../models/Foodmenu.js";

export const addOrder = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { orders } = req.body;

    // Validate if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Calculate the total order price based on all orders and their quantities
    const totalOrderPrice = calculateTotal(orders);

    // Create a new order
    const newOrder = new Order({
      user: userId,
      orders,
      total: totalOrderPrice,
      payment: {
        isPaid: true,
        amount: totalOrderPrice,
        order: new mongoose.Types.ObjectId(),
        pid: 'payment_id',
      },
    });

    await newOrder.save().then((new_order) => {
      User.findOneAndUpdate({_id: userId}, {
        $push: {
          order: {
            orderId: `order_${Math.floor(Math.random() * 1000)}`,
            orders,
            total: new_order.total,
            payment: {}
          }
        }
      })
    });

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const calculateTotal = (orders) => {
  return orders.reduce((total, order) => total + order.foodprice * order.quantity, 0);
};

export const getOrderHistory = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Retrieve the user's order history
    const orderHistory = await Order.find({ user: userId });

    // console.log(orderHistory.map((order) => order.orders));

    const orderMeals = await Foodmenu.find({foodmenuId: {$in: orderHistory.map((oh) => oh.orders.map((order) => order._id)).flat()}});

    console.log(orderHistory.map((oh) => oh.orders.map((order) => order._id)).flat());

    console.log(orderMeals)

    res.status(200).json(orderHistory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getOrderDetails = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Retrieve the details of the latest order
    const latestOrder = await Order.find({ user: userId }).sort({ createdAt: -1 }).limit(1);

    if (!latestOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(latestOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};