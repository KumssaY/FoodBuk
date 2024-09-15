import { Box } from "@mui/material";
import Navbar from "scenes/navbar";
import ComplaintsWidget from "scenes/widgets/ComplaintWidget";

const ComplaintPage = () => {
    return <Box>
        <Navbar/>
        <Box>
            <ComplaintsWidget/>
        </Box>
    </Box>
};

export default ComplaintPage;