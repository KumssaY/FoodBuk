import mongoose from "mongoose";
const paymentSchema = mongoose.Schema(
    {
      pid: {
          type: String,
          required: true
      },
      order: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Order',
          required: true
      },
      method: {
          // "mpesa" | "cash" | "budget"
          type: String,
          required: true,
          default: "budget"
      },
      amount: {
          type: Number,
          required: true
      },
      isPaid: {
          type: Boolean,
          required: true
      }
    },
    { timestamps: true }
  );
  const Payment = mongoose.model("Payments", paymentSchema);

export {paymentSchema};
export default Payment;


// const paymentSchema = mongoose.Schema(
//   {
//     pid: {
//         type: String,
//         required: true
//     },
//     orderID: {
//         type: String,
//         required: true
//     },
//     method: {
//         // "mpesa" | "cash" | "budget"
//         type: String,
//         required: true,
//         default: "budget"
//     },
//     amount: {
//         type: Number,
//         required: true
//     },
//     isPaid: {
//         type: Boolean,
//         required: true
//     }
//   },
//   { timestamps: true }
// );

