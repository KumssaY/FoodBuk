import { Box, Typography, Button, TextField } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useSelector } from "react-redux";

const ComplaintsWidget = () => {
    //      read     , write
    const [complaint, setComplaint] = useState("");
    const token = useSelector((state) => state.token);

    async function submitComplaint() {
      if (complaint?.length > 0) {
        try {
          const complaintResponse = await fetch("http://localhost:3001/complaints", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            body: JSON.stringify({
              complaintText: complaint,
              // You may add more fields like timestamp here if needed
            }),
          });

          console.log(complaintResponse);
        } catch (error) {
          console.error("Error submitting complaint:", error);
        }
      }
    }

  return (
    <Box sx={{
        display: "flex",
        height: "100vh",
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    }}>
        <WidgetWrapper sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "10px",
            width: "100%",
            maxWidth: "400px",
            height: "fit-content",
        }}>
            <Typography>Describe your complaint</Typography>
            <TextField
                id="outlined-multiline-flexible"
                label="Complaint"
                multiline
                rows={4}
                onChange={(e) => {
                  setComplaint(e.target.value);
                }}
            />
            <Button onClick={submitComplaint}>Submit</Button>
        </WidgetWrapper>
    </Box>
  );
};

export default ComplaintsWidget;