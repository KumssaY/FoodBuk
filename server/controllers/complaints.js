import Complaints from "../models/Complaints.js";

/* READ */
export const getComplaint = async ( req, res) => {
    try {
        const { id } = req.params;
        const complaint = await Complaints.findOne({ complaintId: id });
        return res.status(200).json(complaint);
        
    } catch (error) {
        return res.status(404).json({message: err.message});
    }
};

export const getComplaints = async ( req, res ) => {
    try {
        const complaints = await Complaints.find();

        return res.status(200).json(complaints);
        
    } catch (error) {
        res.status(404).json({message: err.message});
    }
};

/* UPDATE */
export const addComplaints = async (req, res) => {
  try {
    // Generate a unique complaintId using Math.random()
    const complaintId = `complaint_${Math.random().toString(36).substr(2, 9)}`;

    // Assuming you're sending complaint details in the request body
    const { complaintText } = req.body;

    // Create a new complaint
    const newComplaint = new Complaints({ complaintId, complainttext: complaintText });

    // Save the complaint to the database
    await newComplaint.save();

    return res.status(201).json(newComplaint);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

  