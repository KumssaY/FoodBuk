import mongoose from "mongoose";

const complaintsSchema = mongoose.Schema(
  {
    complaintId: {
      type: String,
      required: true,
    },
    complainttext: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Complaints = mongoose.model("Complaints", complaintsSchema);

export default Complaints;
