import Order from "../models/Order.js";
import User from "../models/User.js";

export const processPayment = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { orderId, method } = req.body;

    // Validate if the user and order exist
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log(user)

    const targetOrder = await Order.findOne({_id: orderId});
    // const order = await Order.findOne({userId: userId})

    if (!targetOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Process payment based on the chosen method
    if (method === "mpesa" || method === "cash") {
      // Approve payment, set isPaid to true, etc.
      targetOrder.payment = { method, isPaid: true };
    } else if (method === "budget") {
      // Check if the user has enough budget for the order
      if (user.dailybudget.paid || user.dailybudget.amount >= targetOrder.total) {
        // Deduct the order total from the daily budget
        user.dailybudget.amount -= targetOrder.total;
        user.dailybudget.paid = true; // Mark the daily budget as paid for the day
        targetOrder.payment = { method, isPaid: true };
      } else {
        return res.status(400).json({ message: "Insufficient daily budget" });
      }
    }

    await targetOrder.save();
    await user.save();

    res.status(200).json(targetOrder.payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
